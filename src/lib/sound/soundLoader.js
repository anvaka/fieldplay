// Based on https://github.com/michaelbromley/soundcloud-visualizer
// Copyright (c) 2013 Michael Bromley <michael@michaelbromley.co.uk>

/* global SC */
function SoundcloudLoader(player) {
  var self = this;
  var client_id = "oyOHfaO0Xhi6nqwntte71KmwsEQbCmCG"; // to get an ID go to https://developers.soundcloud.com/
  this.sound = {};
  this.streamUrl = "";
  this.errorMessage = "";
  this.player = player;

  /**
   * Loads the JSON stream data object from the URL of the track (as given in the location bar of the browser when browsing Soundcloud),
   * and on success it calls the callback passed to it (for example, used to then send the stream_url to the audiosource object).
   * @param track_url
   * @param callback
   */
  this.loadStream = loadStream;
  
  function loadStream(track_url) {
    if (typeof SC === 'undefined') {
        return new Promise((resolve, reject) => {
            var scAPI = document.createElement('script');
            scAPI.setAttribute('src', '//connect.soundcloud.com/sdk.js');
            scAPI.onload = resolve;
            scAPI.onerror = reject;
            document.head.appendChild(scAPI);
        }).then(() => self.loadStream(track_url));
    }

    return new Promise((successCallback, errorCallback) => {
      SC.initialize({
          client_id: client_id
      });
      SC.get('/resolve', { url: track_url }, function(sound) {
          if (sound.errors) {
              self.errorMessage = "";
              for (var i = 0; i < sound.errors.length; i++) {
                  self.errorMessage += sound.errors[i].error_message + '<br>';
              }
              self.errorMessage += 'Make sure the URL has the correct format: https://soundcloud.com/user/title-of-the-track';
              errorCallback(self.errorMessage);
          } else {

              if(sound.kind=="playlist"){
                  self.sound = sound;
                  self.streamPlaylistIndex = 0;
                  self.streamUrl = function(){
                      return sound.tracks[self.streamPlaylistIndex].stream_url + '?client_id=' + client_id;
                  }
                  successCallback(self);
              }else{
                  self.sound = sound;
                  self.streamUrl = function(){ return sound.stream_url + '?client_id=' + client_id; };
                  successCallback(self);
              }
          }
      });
    });
  };


  this.directStream = function(direction){
      if(direction=='toggle'){
          if (this.player.paused) {
              this.player.play();
          } else {
              this.player.pause();
          }
      }
      else if(this.sound.kind=="playlist"){
          if(direction=='coasting') {
              this.streamPlaylistIndex++;
          }else if(direction=='forward') {
              if(this.streamPlaylistIndex>=this.sound.track_count-1) this.streamPlaylistIndex = 0;
              else this.streamPlaylistIndex++;
          }else{
              if(this.streamPlaylistIndex<=0) this.streamPlaylistIndex = this.sound.track_count-1;
              else this.streamPlaylistIndex--;
          }
          if(this.streamPlaylistIndex>=0 && this.streamPlaylistIndex<=this.sound.track_count-1) {
             this.player.setAttribute('src',this.streamUrl());
             this.player.play();
          }
      }
  }


  };

export default SoundcloudLoader;