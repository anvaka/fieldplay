import util from '../gl-utils';
import UpdatePositionGraph from '../shaderGraph/updatePositionGraph';
import ColorMode from './colorModes';
import makeReadProgram from './colorProgram';
import textureCollection from '../utils/textureCollection';
import makeStatCounter from '../utils/makeStatCounter';
import {decodeFloatRGBA} from '../utils/floatPacking';
import bus from '../bus';

const particlePositionShaderCodeBuilder = new UpdatePositionGraph();

export default function updatePositionProgram(ctx) {
  var gl = ctx.gl;
  var readTextures, writeTextures;
  var particleStateResolution;
  var updateProgram;
  var uniformParticleColor = { r: 77/255, g: 188/255, b: 201/255, a: 1  };
  var readVelocity = makeReadProgram(ctx);

  // If someone needs to get vectors out from the GPU, they send a `vector-lines-request`
  // over the bus. This request is delayed until next compute frame. Once it is handled,
  // we send them back response with calculated vectors.
  var pendingVectorLines;

  // TODO: need to make sure we are not leaking.
  bus.on('vector-lines-request', putVectorLinesRequestIntoQueue);

  return {
    updateCode,
    updateParticlesPositions,
    updateParticlesCount,
    prepareToDraw,
  };

  function updateCode(vectorField) {
    particlePositionShaderCodeBuilder.setCustomVectorField(vectorField);
    let fragment = particlePositionShaderCodeBuilder.getFragmentShader();
    let vertex = particlePositionShaderCodeBuilder.getVertexShader();

    let newProgram = util.createProgram(gl, vertex, fragment);

    if (updateProgram) updateProgram.unload();
    updateProgram = newProgram;

    if (ctx.colorMode === ColorMode.VELOCITY) readVelocity.requestSpeedUpdate();
  }
  
  function updateParticlesCount(x, y) {
    particleStateResolution = ctx.particleStateResolution;

    var dimensions = [{
      name: 'x',
      particleState: x
    }, {
      name: 'y',
      particleState: y
    }];

    if (readTextures) readTextures.dispose();
    readTextures = textureCollection(gl, dimensions, particleStateResolution);

    if (writeTextures) writeTextures.dispose();
    writeTextures = textureCollection(gl, dimensions, particleStateResolution);

    readVelocity.updateParticlesCount();
  }

  function prepareToDraw(program) {
    var colorMode = ctx.colorMode;
    if (colorMode === ColorMode.UNIFORM) gl.uniform4f(program.u_particle_color, uniformParticleColor.r, uniformParticleColor.g, uniformParticleColor.b, uniformParticleColor.a);
    else if (colorMode === ColorMode.VELOCITY) readVelocity.setColorMinMax(program);

    readTextures.bindTextures(gl, program);
  }

  function updateParticlesPositions() {
    var program = updateProgram;
    gl.useProgram(program.program);
  
    util.bindAttribute(gl, ctx.quadBuffer, program.a_pos, 2);
  
    if (ctx.audioTexture) {
      // TODO: I need to manage inputs better. E.g. color program might also need it.
      util.bindTexture(gl, ctx.audioTexture, 5);
      gl.uniform1i(program['u_audio'], 5);
    }

    readTextures.bindTextures(gl, program);
  
    gl.uniform1f(program.u_rand_seed, ctx.frameSeed);
    gl.uniform1f(program.u_h, ctx.integrationTimeStep);
    gl.uniform1f(program.frame, ctx.frame);
    var cursor = ctx.cursor;
    gl.uniform4f(program.cursor, cursor.clickX, cursor.clickY, cursor.hoverX, cursor.hoverY);

    var bbox = ctx.bbox;
    gl.uniform2f(program.u_min, bbox.minX, bbox.minY);
    gl.uniform2f(program.u_max, bbox.maxX, bbox.maxY);

    gl.uniform1f(program.u_drop_rate, ctx.dropProbability);
  
    // Draw each coordinate individually
    for(var i = 0; i < writeTextures.length; ++i) {
      var writeInfo = writeTextures.get(i);
      gl.uniform1i(program.u_out_coordinate, i);
      util.bindFramebuffer(gl, ctx.framebuffer, writeInfo.texture);
      gl.viewport(0, 0, particleStateResolution, particleStateResolution);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    // TODO: I think I need to keep this time-bound, i.e. allocate X ms to
    // process particle positions, and move on. So that the rendering thread is not paused for too long
    if (ctx.colorMode === ColorMode.VELOCITY) {
      readVelocity.updateParticlesPositions(program);
    }

    if (pendingVectorLines) {
      processVectorLinesRequest(program);
      pendingVectorLines = null;
    }

    // swap the particle state textures so the new one becomes the current one
    var temp = readTextures;
    readTextures = writeTextures;
    writeTextures = temp;
  }

  function putVectorLinesRequestIntoQueue(request) {
    pendingVectorLines = request;
  }

  function processVectorLinesRequest(program) {
    var dimensions = [{
      name: 'x',
      particleState: pendingVectorLines.x
    }, {
      name: 'y',
      particleState: pendingVectorLines.y
    }];

    // We create temporary textures and load requested positions in there
    var resolutionOfParticlesInRequest = pendingVectorLines.resolution;
    var numParticles = resolutionOfParticlesInRequest * resolutionOfParticlesInRequest;

    var texturesForRead = textureCollection(gl, dimensions, resolutionOfParticlesInRequest);
    var texturesForWrite = textureCollection(gl, dimensions, resolutionOfParticlesInRequest);

    texturesForRead.bindTextures(gl, program);

    // Then we request coordinates out from GPU for each dimension
    var writeInfo = texturesForWrite.get(0);
    gl.uniform1i(program.u_out_coordinate, 6); // v_x

    util.bindFramebuffer(gl, ctx.framebuffer, writeInfo.texture);
    gl.viewport(0, 0, resolutionOfParticlesInRequest, resolutionOfParticlesInRequest);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    var velocity_x = new Uint8Array(numParticles * 4);
    gl.readPixels(0, 0, resolutionOfParticlesInRequest, resolutionOfParticlesInRequest, gl.RGBA, gl.UNSIGNED_BYTE, velocity_x);

    gl.uniform1i(program.u_out_coordinate, 7); // v_y
    writeInfo = texturesForWrite.get(1);
    util.bindFramebuffer(gl, ctx.framebuffer, writeInfo.texture);
    gl.viewport(0, 0, resolutionOfParticlesInRequest, resolutionOfParticlesInRequest);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    var velocity_y = new Uint8Array(numParticles * 4);
    gl.readPixels(0, 0, resolutionOfParticlesInRequest, resolutionOfParticlesInRequest, gl.RGBA, gl.UNSIGNED_BYTE, velocity_y);

    texturesForWrite.dispose();
    texturesForRead.dispose();

    var xStats = makeStatCounter();
    var yStats = makeStatCounter();

    var decoded_velocity_x = new Float32Array(numParticles);
    var decoded_velocity_y = new Float32Array(numParticles);
    for(var i = 0; i < velocity_y.length; i+=4) {
      var idx = i/4;
      var vx = readFloat(velocity_x, i);
      var vy = readFloat(velocity_y, i);
      decoded_velocity_x[idx] = vx;
      decoded_velocity_y[idx] = vy;
      xStats.add(vx);
      yStats.add(vy);
    }

    var vectorLineInfo = {
      xStats,
      yStats,
      decoded_velocity_x,
      decoded_velocity_y,
      resolution: resolutionOfParticlesInRequest
    };

    bus.fire('vector-line-ready', vectorLineInfo);
  }
}

function readFloat(buffer, offset) {
    return decodeFloatRGBA(
      buffer[offset + 0],
      buffer[offset + 1],
      buffer[offset + 2],
      buffer[offset + 3]
    );
}
