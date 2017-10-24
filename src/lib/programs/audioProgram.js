import bus from '../bus';
import glUtil from '../gl-utils';

export default audioProgram;

function audioProgram(ctx) {
  var gl = ctx.gl;

  var audioWidth = 8, audioHeight = 8;
  var audioBuffer = new Uint8Array(audioWidth * audioHeight * 4);
  var audioTexture = glUtil.createTexture(gl, gl.NEAREST, audioBuffer, audioWidth, audioHeight);
  var audioDirty = false;
  ctx.audioTexture = audioTexture;

  bus.on('audio', updateAudioBuffer);

  return {
    updateTextures,
    dispose
  };

  function dispose() {
    bus.off('audio', updateAudioBuffer);
    gl.deleteTexture(audioTexture);
  }

  function updateTextures() {
    if (!audioDirty) return;
    audioDirty = false;

    var width = 8, height = 8;
    gl.bindTexture(gl.TEXTURE_2D, audioTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, audioBuffer);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  function updateAudioBuffer(newBuffer) {
    audioBuffer = newBuffer;
    audioDirty = true;
  }
}
