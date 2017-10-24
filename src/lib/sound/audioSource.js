import bus from '../bus';
function SoundCloudAudioSource(player) {
  var self = this;
  var analyser;
  var audioCtx = new (window.AudioContext || window.webkitAudioContext);
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;

  var source = audioCtx.createMediaElementSource(player);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  function sampleAudioStream() {
    analyser.getByteFrequencyData(self.streamData);
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

    self.streamData[256 - 1] = self.volume/64;
    self.streamData[256 - 2] = self.volumeLow/32;
    self.streamData[256 - 3] = self.volumeHi/32;
    bus.fire('audio', self.streamData);
    requestAnimationFrame(sampleAudioStream);
  }

  requestAnimationFrame(sampleAudioStream);

  // Public properties and methods
  this.volume = 0;
  this.volumeLow = 0;
  this.volumeHi = 0;
  this.streamData = new Uint8Array(256);

  this.playStream = function(streamUrl) {
      player.crossOrigin = 'anonymous';
      player.setAttribute('src', streamUrl);
      player.play();
  }
};

export default SoundCloudAudioSource;