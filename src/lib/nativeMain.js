/**
 * The main entry point to the application.
 *
 * It is initialized immediately with webgl, and puts
 * vue.js app loading into the future.
 */
import initScene from './scene';
import bus from './bus';
import { initAutoMode } from './autoMode';

var canvas = document.getElementById('scene');
// Canvas may not be available in test run
if (canvas) initVectorFieldApp(canvas);

// Tell webpack to split bundle, and download settings UI later.
require.ensure('@/vueApp.js', () => {
  // Settings UI is ready, initialize vue.js application
  require('@/vueApp.js');
});

function initVectorFieldApp(canvas) {
  canvas.width = window.innerWidth;
  canvas.height =  window.innerHeight;
  var ctxOptions = {antialiasing: false };

  var gl = canvas.getContext('webgl', ctxOptions) ||
          canvas.getContext('experimental-webgl', ctxOptions);

  if (gl) {
    window.webGLEnabled = true;
    var scene = initScene(gl);
    scene.start();
    initAutoMode(scene);
    // TODO: too bad to plop stuff onto window?
    window.scene = scene;
  } else {
    window.webGLEnabled = false;
  }
}

var CCapture;
var currentCapturer;

window.startRecord = startRecord;
window.isRecording = false;

function startRecord(url) {
  if (!CCapture) {
    require.ensure('ccapture.js', () => {
      CCapture = require('ccapture.js');
      window.stopRecord = stopRecord;
      startRecord(url);
    });

    return;
  }

  if (currentCapturer) {
    currentCapturer.stop();
  }

  if (!ffmpegScriptLoaded()) {
    var ffmpegServer = document.createElement('script');
    ffmpegServer.setAttribute('src', url || 'http://localhost:8080/ffmpegserver/ffmpegserver.js');
    ffmpegServer.onload = () => startRecord(url);
    document.head.appendChild(ffmpegServer);
    return;
  }

  currentCapturer = new CCapture( {
      format: 'ffmpegserver',
      framerate: 60,
      verbose: true,
      name: "fieldplay",
      extension: ".mp4",
      codec: "mpeg4",
      ffmpegArguments: [
        "-b:v", "12M",
      ],
  });

  window.isRecording = true;
  currentCapturer.start();
  bus.fire('start-record', currentCapturer)
}

function ffmpegScriptLoaded() {
  return typeof FFMpegServer !== 'undefined'
}

function stopRecord() {
  window.isRecording = false;
  bus.fire('stop-record', currentCapturer)
  currentCapturer.stop();
  currentCapturer.save();
}
