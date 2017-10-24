import UpdatePositionGraph from '../shaderGraph/updatePositionGraph';
import util from '../gl-utils';
import bus from '../bus';
import {decodeFloatRGBA} from '../utils/floatPacking';

/**
 * This program allows to change color of each particle. It works by
 * reading current velocities into a texture from the framebuffer. Once
 * velocities are read, it checks velocity scale and passes it to a draw program.
 */
export default function colorProgram(ctx, colorMode) {
  var maxV, minV, speedNeedsUpdate = true;
  var {gl} = ctx;
  var velocityProgram;
  var velocityTexture;
  var particleStateResolution;
  var pendingSpeedUpdate;
  var numParticles;

  // TODO: do I want to have this independent, or maybe store it in the context?
  // There is a good amount of overlap with how this shader builder is used
  // in updatePositionProgram.
  let colorTextureGraph = new UpdatePositionGraph({colorMode});

  listenToEvents();

  return {
    updateCode,
    updateParticlesPositions,
    onParticleInit,
    bindColorTextures,
    requestSpeedUpdate,
    dispose
  };

  function listenToEvents() {
    bus.on('integration-timestep-changed', requestSpeedUpdate);
    bus.on('bbox-change', requestSpeedUpdate);
  }

  function dispose() {
    bus.off('integration-timestep-changed', requestSpeedUpdate);
    bus.on('bbox-change', requestSpeedUpdate);
    if (velocityTexture) gl.deleteTexture(velocityTexture);
    if (velocityProgram) velocityProgram.unload(); 
  }

  function requestSpeedUpdate() {
    if (pendingSpeedUpdate) clearTimeout(pendingSpeedUpdate);
    pendingSpeedUpdate = setTimeout(() => {
      speedNeedsUpdate = true;
      pendingSpeedUpdate = 0;
    }, 50);
  }

  function bindColorTextures(program) {
    util.bindTexture(gl, velocityTexture, ctx.colorTextureUnit);
    gl.uniform1i(program.u_colors, ctx.colorTextureUnit);
    gl.uniform2f(program.u_velocity_range, minV, maxV);
  }

  function onParticleInit() {
    if (velocityTexture) gl.deleteTexture(velocityTexture);
    particleStateResolution = ctx.particleStateResolution;
    numParticles = particleStateResolution * particleStateResolution;

    var velocityState = new Uint8Array(numParticles * 4);
    velocityTexture = util.createTexture(gl, gl.NEAREST, velocityState, particleStateResolution, particleStateResolution);

    requestSpeedUpdate();
  }

  function updateCode(vectorField) {
    if (!vectorField) return;

    colorTextureGraph.setCustomVectorField(vectorField);
    let fragment = colorTextureGraph.getFragmentShader();
    let vertex = colorTextureGraph.getVertexShader();
    let newVelocityProgram = util.createProgram(gl, vertex, fragment);

    if (velocityProgram) velocityProgram.unload();
    velocityProgram = newVelocityProgram;

    requestSpeedUpdate();
  }

  function updateParticlesPositions(updatePositionProgram) {
    if (!speedNeedsUpdate) return;
    // We only update speed to know min/max range of velocity.
    util.bindFramebuffer(gl, ctx.framebuffer, velocityTexture);
    gl.viewport(0, 0, particleStateResolution, particleStateResolution);
  
    var program = velocityProgram;
    gl.useProgram(program.program);
  
    updatePositionProgram.bindPositionTexturesToProgram(program);
    util.bindAttribute(gl, ctx.quadBuffer, program.a_pos, 2);

    gl.uniform1f(program.u_rand_seed, ctx.frameSeed);
    gl.uniform1f(program.u_h, ctx.integrationTimeStep);
    var bbox = ctx.bbox;
    gl.uniform2f(program.u_min, bbox.minX, bbox.minY);
    gl.uniform2f(program.u_max, bbox.maxX, bbox.maxY);
  
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    speedNeedsUpdate = false;
    var velocityState = new Uint8Array(numParticles * 4);
    gl.readPixels(0, 0, particleStateResolution, particleStateResolution, gl.RGBA, gl.UNSIGNED_BYTE, velocityState);

    maxV = Number.NEGATIVE_INFINITY;
    minV = Number.POSITIVE_INFINITY;
    // TODO: Do I want this to be async?
    for(var i = 0; i < velocityState.length; i+=4) {
      var r = velocityState[i + 0];
      var g = velocityState[i + 1];
      var b = velocityState[i + 2];
      var a = velocityState[i + 3];
      var v = decodeFloatRGBA(r, g, b, a);
      if (v > maxV) maxV = v;
      if (v < minV) minV = v;
    }
  }
}
