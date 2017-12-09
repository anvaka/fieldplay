// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL
export default function loadTexture(gl, url) {
  var resolveTexture, rejectTexture;

  var image = new Image();
  image.crossOrigin = '';

  image.onload = bindTexture;
  image.onerror = reportError;
  image.src = url;

  return new Promise((resolve, reject) => {
    resolveTexture = resolve;
    rejectTexture = reject;
  });

  function reportError(err) {
    rejectTexture(err);
  }

  function bindTexture() {
    var texture = gl.createTexture();
    var level = 0;
    var internalFormat = gl.RGBA;
    var srcFormat = gl.RGBA;
    var srcType = gl.UNSIGNED_BYTE;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  srcFormat, srcType, image);

    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }

    resolveTexture(texture);
  }
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}