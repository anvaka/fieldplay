import loadTexture from "./loadTexture";
import glUtils from '../../gl-utils';

const FREE_TEXTURE_UNIT = 4;

export default function createImageInputBinding(ctx, url) {
  var texture = loadTexture(ctx.gl, url);

  return {
    updateBinding,
    dispose() {
      // TODO: Potential race condition, as loadTexture is async.
      ctx.gl.deleteTexture(texture);
    }
  }

  function updateBinding(program, inputIndex) {
    var realIndex = inputIndex + FREE_TEXTURE_UNIT;
    glUtils.bindTexture(ctx.gl, texture, realIndex);
    ctx.gl.uniform1i(program[`input${inputIndex}`], realIndex);
  }
}