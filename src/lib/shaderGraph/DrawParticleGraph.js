import decodeFloatRGBA from './parts/decodeFloatRGBA';
import ColorModes from '../programs/colorModes';
import UserDefinedVelocityFunction from './UserDefinedVelocityFunction';
import RungeKuttaIntegrator from './RungeKuttaIntegrator';

// TODO: this duplicates code from texture position.
export default class DrawParticleGraph {
  constructor(colorMode) {
    this.colorMode = colorMode;
    this.isUniformColor = (colorMode === ColorModes.UNIFORM);
  }

  getFragmentShader() {
    let variables = [];
    var mainBody = [];

    if (this.isUniformColor) {
      // uniform color comes via uniform setting
      variables.push('uniform vec4 u_particle_color;');
      mainBody.push('gl_FragColor = u_particle_color;');
    } else {
      // Otherwise it comes from a vertex shader
      variables.push('varying vec4 v_particle_color;');
      mainBody.push('gl_FragColor = v_particle_color;');
    }
    return `precision highp float;
${variables.join('\n')}

void main() {
${mainBody.join('\n')}
}`
  }

  getVertexShader(vfCode) {
    let decodePositions = textureBasedPosition();
    let colorParts = this.isUniformColor ? uniformColor() : textureBasedColor(this.colorMode, vfCode);
    let methods = []
    addMethods(decodePositions, methods);
    addMethods(colorParts, methods);
    let main = [];
    addMain(decodePositions, main);
    addMain(colorParts, main);

    return `precision highp float;
attribute float a_index;
uniform float u_particles_res;
uniform vec2 u_min;
uniform vec2 u_max;

${decodePositions.getVariables() || ''}
${colorParts.getVariables() || ''}

${decodeFloatRGBA}

${methods.join('\n')}

void main() {
  vec2 txPos = vec2(
        fract(a_index / u_particles_res),
        floor(a_index / u_particles_res) / u_particles_res);
  gl_PointSize = 1.0;

${main.join('\n')}

  vec2 du = (u_max - u_min);
  v_particle_pos = (v_particle_pos - u_min)/du;
  gl_Position = vec4(2.0 * v_particle_pos.x - 1.0, (1. - 2. * (v_particle_pos.y)),  0., 1.);
}`
  }
}

function addMethods(producer, array) {
  if (producer.getMethods) {
    array.push(producer.getMethods());
  }
}
function addMain(producer, array) {
  if (producer.getMain) {
    array.push(producer.getMain());
  }
}

function textureBasedColor(colorMode, vfCode) {
  var udf = new UserDefinedVelocityFunction(vfCode);
  var integrate = new RungeKuttaIntegrator();

  return {
    getVariables,
    getMain,
    getMethods
  }

  function getVariables() {
    let defines = '';

    return `
uniform sampler2D u_colors;
uniform vec2 u_velocity_range;
${defines}
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
    let decode = colorMode === ColorModes.VELOCITY ?
      `
  float speed = (length(velocity) - u_velocity_range[0])/(u_velocity_range[1] - u_velocity_range[0]);
  v_particle_color = vec4(hsv2rgb(vec3(0.05 + (1. - speed) * 0.5, 0.9, 1.)), 1.0);
` : `
  float speed = (atan(velocity.y, velocity.x) + PI)/(2.0 * PI);
  v_particle_color = vec4(hsv2rgb(vec3(speed, 0.9, 1.)), 1.0);
`;

    return `
vec2 velocity = rk4(v_particle_pos);
${decode}
`
  }
}

function uniformColor() {
  return {
    getVariables() {},
    getMain() {}
  }
}

function textureBasedPosition() {
  return {
    getVariables,
    getMain
  }

  function getVariables() {
    return `
uniform sampler2D u_particles_x;
uniform sampler2D u_particles_y;
    `
  }

  function getMain() {
    return `
  vec2 v_particle_pos = vec2(
    decodeFloatRGBA(texture2D(u_particles_x, txPos)),
    decodeFloatRGBA(texture2D(u_particles_y, txPos))
  );
`
  }
}