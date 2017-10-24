import initScene from './scene';
// import mediaRecorder from './nativeMediaRecorder';
import bus from './bus';

var canvas = document.getElementById('scene');
canvas.width = window.innerWidth;
canvas.height =  window.innerHeight;
var ctxOptions = {antialiasing: false };

var gl = canvas.getContext('webgl', ctxOptions) ||
        canvas.getContext('experimental-webgl', ctxOptions);

if (gl) {
  window.webgGLEnabled = true;
  var scene = initScene(gl);
  scene.start();
  // TODO: too bad to plop stuff onto window?
  window.scene = scene;
} else {
  window.webgGLEnabled = false;
}

require.ensure('@/main.js', () => {
  require('@/main.js');
})

var CCapture;
var currentCapturer;

window.startRecord = startRecord;

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

  currentCapturer.start();
  bus.fire('start-record', currentCapturer)
}

function ffmpegScriptLoaded() {
  return typeof FFMpegServer !== 'undefined'
}

function stopRecord() {
  bus.fire('stop-record', currentCapturer)
  currentCapturer.stop();
  currentCapturer.save();
}