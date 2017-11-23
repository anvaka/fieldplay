/**
 * This API allows to record vector field locally.
 * 
 * See https://github.com/anvaka/fieldplay/blob/master/ScreenRecording.md for more details
 * @param {HTMLCanvas} canvas 
 */
export default function saveVideo(canvas) {
  var recordedChunks = [];

  var options = {mimeType: 'video/webm'};
  var mediaRecorder = new MediaRecorder(canvas.captureStream(60), options);
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = handleStop;

  mediaRecorder.start();

  return stop;

  function stop() {
    mediaRecorder.stop();
  }

  function handleStop() {
    console.log('done');
    download();
  }


  function handleDataAvailable(event) {
    console.log('data');
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    } else {
      // ...
    }
  }
  function download() {
    var blob = new Blob(recordedChunks, {
      type: 'video/webm'
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'test.webm';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}