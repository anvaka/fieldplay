import util from '../gl-utils';
import bus from '../bus';
import {decodeFloatRGBA} from '../utils/floatPacking';
import makeStatCounter from '../utils/makeStatCounter';

const OUT_V_X = 6;
const OUT_V_Y = 7;
/**
 * This program allows to change color of each particle. It works by
 * reading current velocities into a texture from the framebuffer. Once
 * velocities are read, it checks velocity scale and passes it to a draw program.
 */
export default function colorProgram(ctx) {
  var speedNeedsUpdate = true;
  var {gl} = ctx;
  var velocity_y_texture, velocity_x_texture;
  var particleStateResolution;
  var pendingSpeedUpdate;
  var numParticles;
  var velocityCounter = makeStatCounter();
  var velocity_x;
  var velocity_y;

  listenToEvents();

  return {
    updateCode,
    updateParticlesPositions,
    updateParticlesCount,
    setColorMinMax,
    requestSpeedUpdate,
    dispose
  };

  function listenToEvents() {
    bus.on('integration-timestep-changed', requestSpeedUpdate);
    bus.on('bbox-change', requestSpeedUpdate);
  }

  function dispose() {
    bus.off('integration-timestep-changed', requestSpeedUpdate);
    bus.off('bbox-change', requestSpeedUpdate);
    disposeTextures();
  }

  function disposeTextures() {
    if (velocity_x_texture) gl.deleteTexture(velocity_x_texture);
    if (velocity_y_texture) gl.deleteTexture(velocity_y_texture);
  }

  function requestSpeedUpdate() {
    if (pendingSpeedUpdate) clearTimeout(pendingSpeedUpdate);
    pendingSpeedUpdate = setTimeout(() => {
      speedNeedsUpdate = true;
      pendingSpeedUpdate = 0;
    }, 50);
  }

  function setColorMinMax(program) {
    gl.uniform2f(program.u_velocity_range, velocityCounter.getMin(), velocityCounter.getMax());
  }

  function updateParticlesCount() {
    disposeTextures();

    particleStateResolution = ctx.particleStateResolution;
    numParticles = particleStateResolution * particleStateResolution;

    velocity_x = new Uint8Array(numParticles * 4);
    velocity_y = new Uint8Array(numParticles * 4);
    velocity_x_texture = util.createTexture(gl, gl.NEAREST, velocity_x, particleStateResolution, particleStateResolution);
    velocity_y_texture = util.createTexture(gl, gl.NEAREST, velocity_y, particleStateResolution, particleStateResolution);

    requestSpeedUpdate();
  }

  function updateCode() {
    requestSpeedUpdate();
  }

  function updateParticlesPositions(program) {
    if (!speedNeedsUpdate || !velocity_x || !velocity_y) return;
    speedNeedsUpdate = false;

    // We assume this is called from update position program
    util.bindFramebuffer(gl, ctx.framebuffer, velocity_x_texture);
    gl.uniform1i(program.u_out_coordinate, OUT_V_X);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.readPixels(0, 0, particleStateResolution, particleStateResolution, gl.RGBA, gl.UNSIGNED_BYTE, velocity_x);

    util.bindFramebuffer(gl, ctx.framebuffer, velocity_y_texture);
    gl.uniform1i(program.u_out_coordinate, OUT_V_Y);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.readPixels(0, 0, particleStateResolution, particleStateResolution, gl.RGBA, gl.UNSIGNED_BYTE, velocity_y);

    updateMinMax();
  }

  function updateMinMax() {
    velocityCounter.reset();
    // TODO: Do I want this to be async?
    for(var i = 0; i < velocity_y.length; i+=4) {
      var vx = readFloat(velocity_x, i);
      var vy = readFloat(velocity_y, i);
      var v = Math.sqrt(vx * vx + vy * vy);
      velocityCounter.add(v);
    }
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