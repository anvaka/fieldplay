import BaseShaderNode from './BaseShaderNode';

export default class PanzoomTransform extends BaseShaderNode {
  constructor(config) {
    super();
    // decode is used when we move particle read from the texture
    // otherwise we write particle to texture and need to reverse transform
    this.decode = config && config.decode;
    this.srcPosName = (config && config.posName) || 'pos';
  }

  getDefines() {
    if (this.decode) {
      // TODO: Need to figure out how to not duplicate this.
    return `
  uniform vec2 u_min;
  uniform vec2 u_max;
`;
    }
  }

  getMainBody() {
    if (this.decode) {
      return `
  // move particle position according to current transform
  vec2 du = (u_max - u_min);
  pos.x = ${this.srcPosName}.x * du.x + u_min.x;
  pos.y = ${this.srcPosName}.y * du.y + u_min.y;
`
    }
    return `
  pos.x = (${this.srcPosName}.x - u_min.x)/du.x;
  pos.y = (${this.srcPosName}.y - u_min.y)/du.y;
`
  }
}