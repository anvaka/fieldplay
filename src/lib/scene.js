/**
 * This file is based on https://github.com/mapbox/webgl-wind
 * by Vladimir Agafonkin
 * 
 * Released under ISC License, Copyright (c) 2016, Mapbox
 * https://github.com/mapbox/webgl-wind/blob/master/LICENSE
 * 
 * Adapted to field maps by Andrei Kashcha
 * Copyright (C) 2017
 */
import util from './gl-utils';
import makePanzoom from 'panzoom';
import bus from './bus';
import appState from './appState';
import wglPanZoom from './wglPanZoom';
import getParsedVectorFieldFunction from './utils/getParsedVectorFieldFunction';

import createScreenProgram from './programs/screenProgram';
import createDrawParticlesProgram from './programs/drawParticlesProgram';

/**
 * Kicks offs the app rendering. Initialized before even vue is loaded.
 * 
 * @param {WebGLRenderingContext} gl 
 */
export default function initScene(gl) {
  // Canvas size management
  var canvasRect = { width: 0, height: 0, top: 0, left: 0 };
  setWidthHeight(gl.canvas.width, gl.canvas.height);
  window.addEventListener('resize', onResize, true);

  // Video capturing is available in super advanced mode. You'll need to install
  // and start https://github.com/greggman/ffmpegserver.js 
  // Then type in the console: window.startRecord();
  // This will trigger frame-by-frame recording (it is slow). To stop it, call window.stopRecord();
  bus.on('start-record', startRecord);
  bus.on('stop-record', stopRecord);
  var currentCapturer = null;

  // TODO: It feels like bounding box management needs to be moved out from here.
  var bbox = appState.getBBox() || {};
  var currentPanZoomTransform = {
    scale: 1,
    x: 0,
    y: 0
  };

  // How many particles do we want?
  var particleCount = appState.getParticleCount();
  // What is the current code?
  var currentVectorFieldCode = appState.getCode();

  gl.disable(gl.DEPTH_TEST);
  gl.disable(gl.STENCIL_TEST); 

  // TODO: Remove local variables in favour of context.

  // Context variable is a way to share rendering state between multiple programs. It has a lot of stuff on it.
  // I found that it's the easiest way to work in state-full world of WebGL.
  // Until I discover a better way to write WebGL code.
  var ctx = {
    gl,
    bbox,
    canvasRect,

    framebuffer: gl.createFramebuffer(),

    // This is used only to render full-screen rectangle. Main magic happens inside textures.
    quadBuffer: util.createBuffer(gl, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1])),

    colorMode: appState.getColorMode(),

    // This defines texture unit for screen rendering. First few indices are taken by textures
    // that compute particles position/color
    // TODO: I need to find a better way to manage this.
    screenTextureUnit: 3,

    // This is where color texture needs to be bound.
    colorTextureUnit: 2,

    integrationTimeStep: appState.getIntegrationTimeStep(),

    // On each frame the likelihood for a particle to reset its position is this:
    dropProbability: appState.getDropProbability(),

    // current frame number. Reset every time when new shader is compiled
    frame: 0,

    // Texture size to store particles' positions
    particleStateResolution: 0,

    // How quickly we should fade previous frame (from 0..1)
    fadeOpacity: appState.getFadeout(),

    // Ignore this one for a moment. Yes, the app support web audio API,
    // but it's rudimentary, so... shhh! it's a secret.
    // Don't shhh on me!
    audioTexture: null
  };

  // Frame management
  var lastAnimationFrame;
  var isPaused = false;

  // screen rendering;
  var screenProgram = createScreenProgram(ctx);
  var drawProgram = createDrawParticlesProgram(ctx);

  loadCodeFromAppState();

  // particles
  initParticles(particleCount);

  var api = {
    start: nextFrame,
    stop,
    dispose,
    reset,

    setPaused,

    updateVectorField,
    getCurrentCode,

    getParticlesCount,
    setParticlesCount,

    setFadeOutSpeed,
    getFadeOutSpeed,

    setDropProbability,
    getDropProbability,

    getIntegrationTimeStep,
    setIntegrationTimeStep,

    setColorMode,
    getColorMode,

    getCanvasRect() {
      // We trust they don't do anything bad with this ...
      return canvasRect;
    }
  }

  var panzoom = initPanzoom(); 
  restoreBBox();

  setTimeout(() => {
    bus.fire('scene-ready', api);
  })

  return api;

  function startRecord(capturer) {
    currentCapturer = capturer;
  }

  function stopRecord() {
    currentCapturer = null;
  }

  function setColorMode(x) {
    var mode = parseInt(x, 10);
    drawProgram.updateColorMode(mode);
    appState.setColorMode(mode);
    ctx.currentColorMode = mode;
  }

  function getColorMode() {
    return appState.getColorMode();
  }

  function getIntegrationTimeStep() {
    return appState.getIntegrationTimeStep();
  }

  function setIntegrationTimeStep(x) {
    var f = parseFloat(x);
    if (Number.isFinite(f)) {
      ctx.integrationTimeStep = f;
      appState.setIntegrationTimeStep(f);
      bus.fire('integration-timestep-changed', f);
    }
  }

  function setPaused(shouldPause) {
    isPaused = shouldPause;
    nextFrame();
  }

  // Main screen fade out configuration
  function setFadeOutSpeed(x) {
    var f = parseFloat(x);
    if (Number.isFinite(f)) {
      ctx.fadeOpacity = f;
      appState.setFadeout(f);
    }
  }

  function getFadeOutSpeed() {
    return appState.getFadeout();
  }

  // Number of particles configuration
  function getParticlesCount() {
    return appState.getParticleCount();
  }

  function setParticlesCount(newParticleCount) {
    if (!Number.isFinite(newParticleCount)) return;
    if (newParticleCount === particleCount) return;
    if (newParticleCount < 1) return;

    initParticles(newParticleCount);

    particleCount = newParticleCount;
    appState.setParticleCount(newParticleCount);
  }

  // drop probability
  function setDropProbability(x) {
    var f = parseFloat(x);
    if (Number.isFinite(f)) {
      // TODO: Do I need to worry about duplication/clamping?
      appState.setDropProbability(f);
      ctx.dropProbability = f;
    }
  }

  function getDropProbability() {
    return appState.getDropProbability();
  }

  // current code;
  function getCurrentCode() {
    return appState.getCode();
  }

  function loadCodeFromAppState() {
    let persistedCode = appState.getCode();
    if (persistedCode) {
      let result = trySetNewCode(persistedCode);
      if (!result) return; // This means we set correctly;
      // If we get here - something went wrong. see the console
      console.error('Failed to restore previous vector field: ', result.error);
    }
    // we either failed or we want a default vector field
    trySetNewCode(appState.getDefaultCode());
  }

  function updateVectorField(vectorFieldCode) {
    if (vectorFieldCode === currentVectorFieldCode) return;

    let result = trySetNewCode(vectorFieldCode);
    if (result && result.error) return result;

    currentVectorFieldCode = vectorFieldCode;
    appState.saveCode(vectorFieldCode);
  }

  function trySetNewCode(vectorFieldCode) {
    // step 1 - run through parser
    var parserResult = getParsedVectorFieldFunction(vectorFieldCode);

    if (parserResult.error) {
      return parserResult.error;
    }

    // step 2 - run through real webgl
    try {
      drawProgram.updateCode(parserResult.code);
    } catch (e) {
      return {
        error: e.message
      };
    }
  }

  function onResize() {
    setWidthHeight(window.innerWidth, window.innerHeight);

    screenProgram.updateScreenTextures();

    updateBoundingBox(currentPanZoomTransform);
  }

  function setWidthHeight(w, h) {
    var dx = Math.max(w * 0.02, 30);
    var dy = Math.max(h * 0.02, 30);
    canvasRect.width = w + 2 * dx;
    canvasRect.height = h + 2 * dy;
    canvasRect.top = - dy;
    canvasRect.left = - dx;


    let canvas = gl.canvas;
    canvas.width = canvasRect.width;
    canvas.height = canvasRect.height;
    canvas.style.left = (-dx) + 'px';
    canvas.style.top = (-dy) + 'px';
  }

  function dispose() {
      stop();
      panzoom.dispose();
      window.removeEventListener('resize', onResize, true);
  }

  function nextFrame() {
    if (lastAnimationFrame) return;

    if (isPaused) return;

    lastAnimationFrame = requestAnimationFrame(draw);
  }

  function stop() {
    cancelAnimationFrame(lastAnimationFrame);
    lastAnimationFrame = 0;
  }

  function draw() {
    lastAnimationFrame = 0;

    drawScreen();

    if (currentCapturer) currentCapturer.capture(gl.canvas);

    nextFrame();
  }

  function drawScreen() {
    screenProgram.fadeOutLastFrame()
    drawProgram.drawParticles();
    screenProgram.renderCurrentScreen();
    drawProgram.updateParticlesPositions();
  }

  // TODO: Rename to updateParticlesCount()
  function initParticles(numParticles) {
    // we create a square texture where each pixel will hold a particle position encoded as RGBA
    ctx.particleStateResolution = Math.ceil(Math.sqrt(numParticles));
    drawProgram.onParticleInit();
  }

  function initPanzoom() {
    let initializedPanzoom = makePanzoom(gl.canvas, {
      zoomSpeed: 0.025,
      controller: wglPanZoom(gl.canvas, updateBoundingBox)
    });

    return initializedPanzoom;
  }

  function restoreBBox() {
    var savedBBox = appState.getBBox();
    var {width, height} = canvasRect;

    let sX = Math.PI * Math.E;
    let sY = Math.PI * Math.E;
    let tX = 0;
    let tY = 0;
    if (savedBBox) {
      sX = savedBBox.maxX - savedBBox.minX;
      sY = savedBBox.maxY - savedBBox.minY;
      // TODO: Not sure if this is really the best way to do it.
      var ar = width/height;
      tX = width * (savedBBox.minX + savedBBox.maxX)/2;
      tY = height * (savedBBox.minY + savedBBox.maxY)/2*ar;
    }

    var w2 = sX * width/2;
    var h2 = sY * height/2;
    panzoom.showRectangle({
      left: -w2 + tX,
      top: -h2 - tY,
      right: w2 + tX,
      bottom: h2 - tY ,
    });
  }

  function updateBoundingBox(transform) {
    screenProgram.boundingBoxUpdated = true;

    currentPanZoomTransform.x = transform.x;
    currentPanZoomTransform.y = transform.y;
    currentPanZoomTransform.scale = transform.scale;

    var {width, height} = canvasRect;

    var minX = clientX(0);
    var minY = clientY(0);
    var maxX = clientX(width);
    var maxY = clientY(height);

    var ar = width/height;
    bbox.minX = minX/width;
    bbox.minY =  -minY/height / ar;
    bbox.maxX = maxX/width;
    bbox.maxY =  -maxY/height / ar;


    appState.saveBBox(bbox);

    bus.fire('bbox-change', bbox);

    function clientX(x) {
      return (x - transform.x)/transform.scale;
    }

    function clientY(y) {
      return (y - transform.y)/transform.scale;
    }
  }

  function reset() {
    var w = canvasRect.width/2;
    var h = canvasRect.height/2;

    appState.saveBBox({
      minX: -w,
      minY: -h,
      maxX: w,
      maxY: h
    }, /* immediate = */ true);
    restoreBBox();
    // a hack to trigger panzoom event
    panzoom.moveBy(0, 0, false);
  }
}