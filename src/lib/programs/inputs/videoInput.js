import config from '../../config';
import glUtils from '../../gl-utils';

export default function createVideoInput(ctx, url) {
  var playing = false;
  var timeupdate = false;
  var copyVideo = false;

  var video = setupVideo();
  var currentFrame = createTexture();

  return {
    updateBinding,
    dispose
  };

  function updateBinding(program, inputIndex) {
    var realIndex = inputIndex + config.FREE_TEXTURE_UNIT;
    glUtils.bindTexture(ctx.gl, currentFrame, realIndex);
    if (copyVideo) updateTexture(ctx.gl)
    ctx.gl.uniform1i(program[`input${inputIndex}`], realIndex);
  }

  function updateTexture(gl) {
    const level = 0;
    const internalFormat = gl.RGBA;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, video);
  }

  function createTexture() {
    var gl = ctx.gl;
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    var level = 0;
    var internalFormat = gl.RGBA;
    var width = 1;
    var height = 1;
    var border = 0;
    var srcFormat = gl.RGBA;
    var srcType = gl.UNSIGNED_BYTE;
    var pixel = new Uint8Array([0, 0, 255, 255]);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  width, height, border, srcFormat, srcType,
                  pixel);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    return texture;
  }
  function dispose() {
    video.removeEventListener('playing', onPlaying, true);
    video.removeEventListener('timeupdate', onTimeUpdate, true);
  }

  function setupVideo() {
    var video = document.createElement('video');
    video.crossOrigin = '';
    video.autoplay = true;
    video.muted = true;
    video.loop = true;

    // Waiting for these 2 events ensures there is data in the video
    video.addEventListener('playing', onPlaying, true);
    video.addEventListener('timeupdate', onTimeUpdate, true);

    video.src = url;
    video.play();

    return video;
  }

  function checkReady() {
    if (playing && timeupdate) {
      copyVideo = true;
    }
  }
  function onPlaying() {
     playing = true;
     checkReady();
  }

  function onTimeUpdate() {
     timeupdate = true;
     checkReady();
  }
}