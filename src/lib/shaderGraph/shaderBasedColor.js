import UserDefinedVelocityFunction from './UserDefinedVelocityFunction';
import RungeKuttaIntegrator from './RungeKuttaIntegrator';
import ColorModes from '../programs/colorModes';

export default function shaderBasedColor(colorMode, vfCode) {
  var udf = new UserDefinedVelocityFunction(vfCode);
  var integrate = new RungeKuttaIntegrator();

  return {
    getVariables,
    getMain,
    getMethods
  }

  function getVariables() {
    return `
uniform vec2 u_velocity_range;
varying vec4 v_particle_color;
${udf.getDefines()}
${integrate.getDefines()}
`
  }

  function getMethods() {
    return `
// https://github.com/hughsk/glsl-hsv2rgb
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

${udf.getFunctions()}
${integrate.getFunctions()}
`
  }

  function getMain() {
    // TODO: This needs to be refactored. I don't like code duplication.
    let setParticleColor;
    if (colorMode === ColorModes.VELOCITY) {
      setParticleColor = `
  float speed = (length(velocity) - u_velocity_range[0])/(u_velocity_range[1] - u_velocity_range[0]);
  v_particle_color = vec4(hsv2rgb(vec3(0.05 + (1. - speed) * 0.5, 0.9, 1.)), 1.0);
`
    } else {
      setParticleColor = `
  float speed = (atan(velocity.y, velocity.x) + PI)/(2.0 * PI);
  v_particle_color = vec4(hsv2rgb(vec3(speed, 0.9, 1.)), 1.0);
`;
}

    return `
vec2 velocity = get_velocity(v_particle_pos);
${setParticleColor}
`
  }
}
