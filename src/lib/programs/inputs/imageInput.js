/**
 * Creates a single image binding element in the input collection.
 */
import loadTexture from "./loadTexture";
import glUtils from '../../gl-utils';
import config from '../../config';
import bus from '../../bus';

const FREE_TEXTURE_UNIT = config.FREE_TEXTURE_UNIT;

export default function createImageInputBinding(ctx, url, callbacks) {
  var texture = null;
  loadTexture(ctx.gl, url).then(setTexture).catch(handleError);

  return {
    updateBinding,
    dispose() {
      // TODO: Potential race condition, as loadTexture is async.
      ctx.gl.deleteTexture(texture);
    }
  }

  function handleError(err) {
    if (callbacks && callbacks.error) {
      callbacks.error(err);
    }
  }

  function setTexture(loadedTexture) {
    texture = loadedTexture;
    bus.fire('refresh-speed')
    if (callbacks && callbacks.done) {
      callbacks.done(url);
    }
  }

  function updateBinding(program, inputIndex) {
    if (!texture) return;

    var realIndex = inputIndex + FREE_TEXTURE_UNIT;
    glUtils.bindTexture(ctx.gl, texture, realIndex);
    ctx.gl.uniform1i(program[`input${inputIndex}`], realIndex);
  }
}