import BaseShaderNode from './BaseShaderNode';

export default class RungeKuttaIntegrator extends BaseShaderNode {
  constructor () {
    super();
  }

  getDefines() {
    return `
uniform float u_h;
`
  }

  getFunctions() {
    return `
vec2 rk4(const vec2 point) {
  vec2 k1 = get_velocity( point );
  vec2 k2 = get_velocity( point + k1 * u_h * 0.5);
  vec2 k3 = get_velocity( point + k2 * u_h * 0.5);
  vec2 k4 = get_velocity( point + k3 * u_h);

  return k1 * u_h / 6. + k2 * u_h/3. + k3 * u_h/3. + k4 * u_h/6.;
}`
  }

  getMainBody() {
    return `
  vec2 velocity = rk4(pos);
`
  }
}