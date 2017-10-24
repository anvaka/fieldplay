import BaseShaderNode from './BaseShaderNode';
import encodeFloatRGBA from './parts/encodeFloatRGBA';
import decodeFloatRGBA from './parts/decodeFloatRGBA';

/**
 * Reads/writes particle coordinates from/to a texture;
 */
export default class TexturePosition extends BaseShaderNode {
  constructor(isDecode) {
    super();

    // When it's decoding, it must read from the texture.
    // Otherwise it must write to the texture;
    this.isDecode = isDecode;
  }

  getFunctions() {
    if (this.isDecode) {
      return `
    ${encodeFloatRGBA}
    ${decodeFloatRGBA}
`
    }
  }

  getDefines() {
    if (this.isDecode) {
      // TODO: How to avoid duplication and silly checks?
    return `
precision highp float;

uniform sampler2D u_particles_x;
uniform sampler2D u_particles_y;

// Which coordinate needs to be printed onto the texture
uniform int u_out_coordinate;

varying vec2 v_tex_pos;
`;
    }
  }

  getMainBody() {
  if (this.isDecode) {
    return `
   vec2 pos = vec2(
     decodeFloatRGBA(texture2D(u_particles_x, v_tex_pos)),
     decodeFloatRGBA(texture2D(u_particles_y, v_tex_pos))
   );
`
    }
    return `
    if (u_out_coordinate == 0) gl_FragColor = encodeFloatRGBA(pos.x);
    else if (u_out_coordinate == 1) gl_FragColor = encodeFloatRGBA(pos.y);
`
  }
}