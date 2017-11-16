import decodeFloatRGBA from './parts/decodeFloatRGBA';
import shaderBasedColor from './shaderBasedColor';
import ColorModes from '../programs/colorModes';

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
    let colorParts = this.isUniformColor ? uniformColor() : shaderBasedColor(this.colorMode, vfCode);
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