import bus from '../bus';
window.frequenciesCount = 0;

var bufferLength = 2200320;
window.audioBuffer = new Uint8Array(bufferLength);

function SoundCloudAudioSource(player) {
  var self = this;
  var analyser;
  var audioCtx = new (window.AudioContext || window.webkitAudioContext);
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;

  var source = audioCtx.createMediaElementSource(player);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  var lastAnimationFrame = 0;

  function sampleAudioStream() {
    analyser.getByteFrequencyData(self.streamData);
    window.frequenciesCount += analyser.frequencyBinCount;

    // // Calculate an overall volume value
    var total = 0;
    for (var i = 0; i < 64; i++) { // Get the volume from the first 64 bins
      total += self.streamData[i];
    }
    self.volume = total;

    var totalLow = 0;
    for (var i = 0; i < 31; i++) { // Get the volume from the first 32 bins
      totalLow += self.streamData[i];
    }
    self.volumeLow = totalLow;

    var totalHi = 0;
    for (var i = 31; i < 64; i++) { // Get the volume from the second 32 bins
      totalHi += self.streamData[i];
    }
    self.volumeHi = totalHi;

    // self.streamData[256 - 1] = self.volume/64;
    // self.streamData[256 - 2] = self.volumeLow/32;
    // self.streamData[256 - 3] = self.volumeHi/32;
    bus.fire('audio', self.streamData);
    lastAnimationFrame = requestAnimationFrame(sampleAudioStream);
  }


  // Public properties and methods
  this.volume = 0;
  this.volumeLow = 0;
  this.volumeHi = 0;
  this.streamData = new Uint8Array(analyser.frequencyBinCount);

  this.playStream = function(streamUrl) {
    onPlayerEnded();
    player.crossOrigin = 'anonymous';
    player.setAttribute('src', streamUrl);
    player.play();
    
    player.removeEventListener('ended', onPlayerEnded)
    player.addEventListener('ended', onPlayerEnded)

    player.removeEventListener('play', onPlayerStarted)
    player.addEventListener('play', onPlayerStarted)

    player.removeEventListener('pause', onPlayerEnded)
    player.addEventListener('pause', onPlayerEnded)
  }

  function onPlayerStarted() {
    console.log('started')
    lastAnimationFrame = requestAnimationFrame(sampleAudioStream);
  }

  function onPlayerEnded() {
    console.log('stop')
    // 2200320
    cancelAnimationFrame(lastAnimationFrame);
    lastAnimationFrame = false;
  }
};

export default SoundCloudAudioSource;