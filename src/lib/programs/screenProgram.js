/**
 * Renders computed state onto the screen.
 */
import glUtils from '../gl-utils';

const NO_TRANSFORM = {dx: 0, dy: 0, scale: 1};

export default function makeScreenProgram(ctx) {
  var {gl, canvasRect} = ctx;

  var screenTexture, backgroundTexture;
  var boundBoxTextureTransform = {dx: 0, dy: 0, scale: 1};
  var lastRenderedBoundingBox = null;

  // TODO: Allow customization? Last time I tried, I didn't like it too much.
  // It was very easy to screw up the design, and the tool looked ugly :-/
  let backgroundColor = { r: 19/255, g: 41/255, b: 79/255, a: 1 };

  updateScreenTextures();
  var screenProgram = glUtils.createProgram(gl, getScreenVertexShader(), getScreenFragmentShader());
  
  var api = {
    fadeOutLastFrame,
    renderCurrentScreen,
    updateScreenTextures,

    boundingBoxUpdated: false
  };

  return api;
  
  function fadeOutLastFrame() {
    // render to the frame buffer
    glUtils.bindFramebuffer(gl, ctx.framebuffer, screenTexture);
    gl.viewport(0, 0, canvasRect.width, canvasRect.height);

    if (api.boundingBoxUpdated && lastRenderedBoundingBox) {
      // We move the back texture, relative to the bounding box change. This eliminates
      // particle train artifacts, though, not all of them: https://computergraphics.stackexchange.com/questions/5754/fading-particles-and-transition
      // If you know how to improve this - please let me know.
      boundBoxTextureTransform.dx = -(ctx.bbox.minX - lastRenderedBoundingBox.minX)/(ctx.bbox.maxX - ctx.bbox.minX);
      boundBoxTextureTransform.dy = -(ctx.bbox.minY - lastRenderedBoundingBox.minY)/(ctx.bbox.maxY - ctx.bbox.minY);
      boundBoxTextureTransform.scale = (ctx.bbox.maxX - ctx.bbox.minX) / (lastRenderedBoundingBox.maxX - lastRenderedBoundingBox.minX);
      drawTexture(backgroundTexture, ctx.fadeOpacity, boundBoxTextureTransform);
    } else {
      drawTexture(backgroundTexture, ctx.fadeOpacity, NO_TRANSFORM)
    }
  }

  function renderCurrentScreen() {
    glUtils.bindFramebuffer(gl, null);

    saveLastBbox();

    gl.enable(gl.BLEND); 
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(backgroundColor.r, backgroundColor.g, backgroundColor.b, backgroundColor.a);
    gl.clear(gl.COLOR_BUFFER_BIT);
    drawTexture(screenTexture, 1.0, NO_TRANSFORM);
    gl.disable(gl.BLEND);

    var temp = backgroundTexture;
    backgroundTexture = screenTexture;
    screenTexture = temp;

    api.boundingBoxUpdated = false;
    if (window.audioTexture) {
      drawTexture(window.audioTexture, 1.0, NO_TRANSFORM);
    }
  }

  function updateScreenTextures() {
    var {width, height} = canvasRect;
    var emptyPixels = new Uint8Array(width * height * 4);
    if (screenTexture) {
      gl.deleteTexture(screenTexture);
    }
    if (backgroundTexture) {
      gl.deleteTexture(backgroundTexture);
    }

    screenTexture = glUtils.createTexture(gl, gl.NEAREST, emptyPixels, width, height);
    backgroundTexture = glUtils.createTexture(gl, gl.NEAREST, emptyPixels, width, height);
  }

  function saveLastBbox() {
    if (!lastRenderedBoundingBox) {
      lastRenderedBoundingBox = {
        minX: ctx.bbox.minX,
        minY: ctx.bbox.minY,
        maxX: ctx.bbox.maxX,
        maxY: ctx.bbox.maxY
      }

      return;
    } 

    lastRenderedBoundingBox.minX = ctx.bbox.minX;
    lastRenderedBoundingBox.minY = ctx.bbox.minY;
    lastRenderedBoundingBox.maxX = ctx.bbox.maxX;
    lastRenderedBoundingBox.maxY = ctx.bbox.maxY;
  }

  function drawTexture(texture, opacity, textureTransform) {
    var program = screenProgram;
    gl.useProgram(program.program);
    glUtils.bindAttribute(gl, ctx.quadBuffer, program.a_pos, 2);

    // TODO: This index is very fragile. I need to find a way
    glUtils.bindTexture(gl, texture, ctx.screenTextureUnit);
    gl.uniform1i(program.u_screen, ctx.screenTextureUnit);

    gl.uniform1f(program.u_opacity_border, 0.02);
    gl.uniform1f(program.u_opacity, opacity);
    gl.uniform3f(program.u_transform, textureTransform.dx, textureTransform.dy, textureTransform.scale);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}

function getScreenVertexShader() {
  return `// screen program
precision highp float;

attribute vec2 a_pos;
varying vec2 v_tex_pos;
uniform vec3 u_transform;

void main() {
    v_tex_pos = a_pos;
    vec2 pos = a_pos;

    // This transformation tries to move texture (raster) to the approximate position
    // of particles on the current frame. This is needed to avoid rendering artifacts
    // during pan/zoom: https://computergraphics.stackexchange.com/questions/5754/fading-particles-and-transition

    // PS: I must admit, I wrote this formula through sweat and tears, and
    // I still have no idea why I don't need to apply (pos.y - 0.5) to Y coordinate.
    // Is it because I use aspect ratio for bounding box?
    pos.x = (pos.x - 0.5) / u_transform.z - u_transform.x + 0.5 * u_transform.z;
    pos.y = pos.y / u_transform.z + u_transform.y;

    pos = 1.0 - 2.0 * pos;
    gl_Position = vec4(pos, 0, 1);
}`
}

function getScreenFragmentShader() {
  return `precision highp float;
uniform sampler2D u_screen;
uniform float u_opacity;
uniform float u_opacity_border;

varying vec2 v_tex_pos;

void main() {
  vec2 p = 1.0 - v_tex_pos;
  vec4 color = texture2D(u_screen, p);

  // For some reason particles near border leave trace when we translate the texture
  // This is my dirty hack to fix it: https://computergraphics.stackexchange.com/questions/5754/fading-particles-and-transition
  if (p.x < u_opacity_border || p.x > 1. - u_opacity_border || p.y < u_opacity_border || p.y > 1. - u_opacity_border) {
    gl_FragColor = vec4(0.);
  } else {
    // opacity fade out even with a value close to 0.0
    gl_FragColor = vec4(floor(255.0 * color * u_opacity) / 255.0);
  }
}`
}