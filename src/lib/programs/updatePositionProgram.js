import util from '../gl-utils';
import UpdatePositionGraph from '../shaderGraph/updatePositionGraph';
import ColorMode from './colorModes';
import makeReadProgram from './colorProgram';

const particlePositionShaderCodeBuilder = new UpdatePositionGraph();

export default function updatePositionProgram(ctx) {
  var gl = ctx.gl;
  var readTextures, writeTextures;
  var particleStateResolution;
  var updateProgram;
  var uniformParticleColor = { r: 77/255, g: 188/255, b: 201/255, a: 1  };
  var readVelocity = makeReadProgram(ctx);

  return {
    updateCode,
    updateParticlesPositions,
    onParticleInit,
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
  
  function onParticleInit(x, y) {
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

    readVelocity.onParticleInit();
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

    if (ctx.colorMode === ColorMode.VELOCITY) {
      readVelocity.updateParticlesPositions(program);
    }

    // swap the particle state textures so the new one becomes the current one
    var temp = readTextures;
    readTextures = writeTextures;
    writeTextures = temp;
  }
}

function textureCollection(gl, dimensions, particleStateResolution) {
  var textures = dimensions.map((d, index) => {
    var textureInfo = {
      texture: util.createTexture(gl, gl.NEAREST, d.particleState, particleStateResolution, particleStateResolution),
      index: index,
      name: d.name
    }

    return textureInfo;
  })

  return {
    dispose,
    bindTextures,
    assignProgramUniforms,
    length: dimensions.length,
    textures,
    get(i) { return textures[i]; }
  }

  function assignProgramUniforms(program) {
    textures.forEach(tInfo => {
      gl.uniform1i(program['u_particles_' + tInfo.name], tInfo.index);
    });
  }

  function dispose() {
    textures.forEach(tInfo => gl.deleteTexture(tInfo.texture));
  }

  function bindTextures(gl, program) {
    textures.forEach((tInfo) => {
      util.bindTexture(gl, tInfo.texture, tInfo.index);
      gl.uniform1i(program['u_particles_' + tInfo.name], tInfo.index);
    })
  }
}