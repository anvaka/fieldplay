import util from '../gl-utils';
import DrawParticleGraph from '../shaderGraph/DrawParticleGraph';
import defaultColorProgram from './colorProgram';
import uniformColorProgram from './uniformColorProgram';
import makeUpdatePositionProgram from './updatePositionProgram';
import { encodeFloatRGBA } from '../utils/floatPacking.js';
import config from '../config';
import createAudioProgram from './audioProgram';

import ColorMode from './colorModes';

export default function drawParticlesProgram(ctx) {
  var gl = ctx.gl;

  var particleStateResolution, particleIndexBuffer;
  var numParticles;

  var currentVectorField = '';
  var currentColorMode = ctx.colorMode;
  var updatePositionProgram = makeUpdatePositionProgram(ctx);
  var audioProgram;

  var drawProgram, colorProgram;
  initPrograms();

  return {
    onParticleInit,
    updateParticlesPositions,
    drawParticles,
    updateCode,
    updateColorMode
  }

  function initPrograms() {
    let isUniformColor = currentColorMode === ColorMode.UNIFORM;
    if (colorProgram) colorProgram.dispose();
    colorProgram = isUniformColor ? uniformColorProgram(ctx) : defaultColorProgram(ctx, currentColorMode);

    colorProgram.updateCode(currentVectorField);
    colorProgram.onParticleInit();

    // need to update the draw graph because color mode shader has changed.
    const drawGraph = new DrawParticleGraph(currentColorMode);
    if (drawProgram) drawProgram.unload();
    drawProgram = util.createProgram(gl, drawGraph.getVertexShader(currentVectorField), drawGraph.getFragmentShader());

    if (config.isAudioEnabled) {
      if (audioProgram) audioProgram.dispose();
      audioProgram = createAudioProgram(ctx);
    }
  }

  function updateParticlesPositions() {
    ctx.frame += 1
    ctx.frameSeed = Math.random();

    if (audioProgram) audioProgram.updateTextures();

    updatePositionProgram.updateParticlesPositions();
    colorProgram.updateParticlesPositions(updatePositionProgram);

    updatePositionProgram.commitUpdate();
  }


  function updateColorMode(colorMode) {
    currentColorMode = colorMode;
    initPrograms();

  }

  function updateCode(vfCode) {
    ctx.frame = 0;
    currentVectorField = vfCode;
    updatePositionProgram.updateCode(vfCode);
    colorProgram.updateCode(vfCode);

    const drawGraph = new DrawParticleGraph(currentColorMode);
    if (drawProgram) drawProgram.unload();
    drawProgram = util.createProgram(gl, drawGraph.getVertexShader(currentVectorField), drawGraph.getFragmentShader());
  }


  function onParticleInit() {
    if (!currentVectorField) return;

    particleStateResolution = ctx.particleStateResolution;
    numParticles = particleStateResolution * particleStateResolution;
    var particleIndices = new Float32Array(numParticles);
    var particleStateX = new Uint8Array(numParticles * 4);
    var particleStateY = new Uint8Array(numParticles * 4);

    var minX = ctx.bbox.minX; var minY = ctx.bbox.minY;
    var width = ctx.bbox.maxX - minX;
    var height = ctx.bbox.maxY - minY;
    for (var i = 0; i < numParticles; i++) {
      encodeFloatRGBA((Math.random()) * width + minX, particleStateX, i * 4); // randomize the initial particle positions
      encodeFloatRGBA((Math.random()) * height + minY, particleStateY, i * 4); // randomize the initial particle positions

      particleIndices[i] = i;
    }

    if (particleIndexBuffer) gl.deleteBuffer(particleIndexBuffer);
    particleIndexBuffer = util.createBuffer(gl, particleIndices);

    updatePositionProgram.onParticleInit(particleStateX, particleStateY);
    colorProgram.onParticleInit();
  }

  function drawParticles() {
    var program = drawProgram;
    gl.useProgram(program.program);
  
    util.bindAttribute(gl, particleIndexBuffer, program.a_index, 1);
    
    updatePositionProgram.bindPositionTexturesToProgram(program);
    colorProgram.bindColorTextures(program, updatePositionProgram);
  
    gl.uniform1f(program.u_h, ctx.integrationTimeStep);
    gl.uniform1f(program.frame, ctx.frame);
    gl.uniform1f(program.u_particles_res, particleStateResolution);
    var bbox = ctx.bbox;
    gl.uniform2f(program.u_min, bbox.minX, bbox.minY);
    gl.uniform2f(program.u_max, bbox.maxX, bbox.maxY);
  
    gl.drawArrays(gl.POINTS, 0, numParticles); 
  }
}