<template>
  <div class='settings' :class='{collapsed: settingsPanel.collapsed}'>
    <div class='block vector-field'>
      <div class='title'>Vector field</div>
      <pre>
<span class='comment'>// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p</span>
function velocity(<span class='type' >vec2</span> p) {
  <span class='type'>vec2</span> v = <span class='type'>vec2</span>(0., 0.);</pre>
      <textarea ref='codeInput' v-model='vectorField' type='text' rows='3' autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
<pre>  return v;
}</pre>
    <div class='error=container'>
      <pre v-if='error' class='error hl'>{{error}}</pre>
      <pre v-if='errorDetail' class='error detail'>{{errorDetail}}<span v-if='isFloatError'>
Did you forget to add a dot symbol? E.g. <span class='hl'>10</span> should be <span class='hl'>10.</span> and <span class='hl'>42</span> should be <span class='hl'>42.</span>
</span></pre>
    </div>
    </div>
    <form class='block' @submit.prevent='onSubmit'>
      <div class='row'>
        <div class='col'>Particle color</div>
        <div class='col full'> 
          <select v-model='selectedColorMode' @change='changeColor'>
              <option value='1'>Uniform</option>
              <option value='2'>Velocity</option>
              <option value='3'>Angle</option>
	        </select>
        </div>
      </div>
      <div class='row' v-if='soundAvailable'>
        <div class='col'>SoundCloud track</div>
        <div class='col full'>
          <input type='text' v-model='soundCloudLink'>
          <a href='#' @click.prevent='loadSound'>load</a>
        </div>
      </div>
      <div class='row' v-if='soundAvailable'>
        <audio ref='player' controls='' autoplay='' preload autobuffer></audio>
      </div>
      <div class='row'>
        <div class='col'>Particles count </div>
        <div class='col full'><input type='text' v-model='particlesCount' @keyup.enter='onSubmit'></div>
      </div>
      <div class='row'>
        <div class='col'>Fade out speed</div>
        <div class='col full'><input type='text' v-model='fadeOutSpeed' @keyup.enter='onSubmit'></div>
      </div>
      <div class='row'>
        <div class='col'>Particle reset probability</div>
        <div class='col full'><input type='text' v-model='dropProbability' @keyup.enter='onSubmit'></div>
      </div>
      <div class='row'>
        <div class='col'>Integration timestep</div>
        <div class='col full'><input type='text' v-model='timeStep' @keyup.enter='onSubmit'></div>
      </div>
      <div class='row'>
        <a class='col reset' href='#' @click='reset'>Reset</a>
      </div>
    </form>
  </div>
</template>
<script>
import bus from '../lib/bus';
import appState from '../lib/appState';
import autosize from 'autosize';
import generateFunction from '../lib/generate-equation';
import SoundLoader from '../lib/sound/soundLoader';
import SoundCloudAudioSource from '../lib/sound/audioSource';
import config from '../lib/config';

// Temporary disable this until API is finished.
const soundAvailable = config.isAudioEnabled;

export default {
  name: 'Settings',
  props: ['scene'],
  mounted() {
    bus.on('scene-ready', this.onSceneReady, this);
    bus.on('generate-field', this.generateNewFunction, this);
    autosize(this.$refs.codeInput);

    if (soundAvailable) this.soundLoader = new SoundLoader(this.$refs.player);
  },
  beforeDestroy() {
    bus.off('scene-ready', this.onSceneReady, this);
    bus.off('generate-field', this.generateNewFunction, this);
    autosize.destroy(this.$refs.codeInput);
  },
  data() {
    return {
      error: '',
      errorDetail: '',
      soundCloudLink: 'https://soundcloud.com/mrfijiwiji/yours-truly',
      isFloatError: false,
      vectorField: '',
      settingsPanel: appState.settingsPanel,
      particlesCount: 0,
      fadeOutSpeed: 0,
      dropProbability: 0,
      timeStep: 0,
      selectedColorMode: 0,
      soundAvailable: soundAvailable
    };
  },
  watch: {
    vectorField(newValue, oldValue) {
      // console.log(newValue, oldValue);
      // TODO: this seem to be causing double initialization
      if (this.pendingSetCode) {
        clearTimeout(this.pendingSetCode);
      }

      this.pendingSetCode = setTimeout(() => {
        this.sendVectorField();
        this.pendingSetCode = 0;

        autosize.update(this.$refs.codeInput);
      }, 300);
    },
    particlesCount(newValue, oldValue) {
      this.scene.setParticlesCount(parseInt(newValue, 10));
    },
    timeStep(newValue, oldValue) {
      this.scene.setIntegrationTimeStep(newValue);
    },
    fadeOutSpeed(newValue, oldValue) {
      this.scene.setFadeOutSpeed(newValue);
    },
    dropProbability(newValue, oldValue) {
      this.scene.setDropProbability(newValue);
    },
    selectedColorMode(newValue) {
      this.scene.setColorMode(newValue);
    }
  },
  methods: {
    loadSound() {
      if (!this.soundLoader) return;
      this.soundLoader.loadStream(this.soundCloudLink).then(e => {
        if (!this.audioSource) {
          this.audioSource = new SoundCloudAudioSource(this.$refs.player); 
        }
        this.audioSource.playStream(this.soundLoader.streamUrl())
      });
      // TODO: Error handling
    },
    generateNewFunction() {
      this.vectorField = generateFunction();
    },
    reset() {
      // we reset the scene, and let the a.href = # do the rest.
      this.scene.reset();
    },
    onSubmit() {
      if (window.innerWidth < 600) {
        appState.settingsPanel.collapsed = true;
      }
    },

    changeColor(e) {
      this.selectedColorMode = e.target.value;
    },

    updateBackground(rgba) {
      this.scene.setBackgroundColor(rgba);
    },

    onSceneReady(scene) {
      this.vectorField = scene.getCurrentCode();
      this.particlesCount = scene.getParticlesCount();
      this.fadeOutSpeed = scene.getFadeOutSpeed();
      this.dropProbability = scene.getDropProbability();
      this.timeStep = scene.getIntegrationTimeStep();
      this.selectedColorMode = scene.getColorMode();
    },

    sendVectorField() {
      let result = this.scene.updateVectorField(this.vectorField);
      if (result && result.error) {
        this.error = result.error;
        this.errorDetail = result.errorDetail;
        this.isFloatError = result.isFloatError;
      } else {
        this.error = '';
        this.errorDetail = '';
        this.isFloatError = false;
      }
    },
  }
}

function toColorString({r, g, b, a}) {
  if (a === 1.0) {
    return `#${hex(r)}${hex(g)}${hex(b)}`;
  }
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function hex(x) {
  let value = x.toString(16).toUpperCase();
  if (value.length === 1) value = '0' + value;
  return value;
}
</script>

<style lang='stylus'>
@import "./shared.styl";

.settings {
  color: secondary-text;
  position: absolute;
  overflow-y: auto;
  top: control-bar-height;
  left: 0;
  background: window-background;
  width: settings-width;
  border: 1px solid primary-border;
  border-left: none;
  border-top: none;
  padding: 7px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.settings.collapsed {
  display: none;
}
.block {
  .col {
    align-items: center;
    display: flex;
  }
  .row {
    margin-top: 4px;
  }
  select {
    margin-left: 14px;
  }

  input[type='text'] {
    background: transparent;
    color: primary-text;
    border: 1px solid transparent;
    padding: 7px;
    font-size: 16px;
    width: 100%;
    margin-left: 7px;
    &:focus {
      outline: none;
      border: 1px dashed;
      background: #13294f;
    }
  }
}
form.block {
  margin-top: 12px;
  border-top: 1px solid secondary-border;
  padding-top: 10px;
}
.vector-field {
  pre {
    margin: 0;
    color: #6789ab;
    .comment {
      color: #435970;
      font-style: italic;
    }
  }

  pre.error {
    color: rgba(250, 232, 55, 1);
    overflow-y: auto;
  }
  pre.error.detail {
    overflow: none;
    white-space: normal;
    .hl {
      background-color: #172A4D;
      color: red;
      font-weight: bold;
    }
  }

  .title {
    text-align: center;
    margin-bottom: 7px;
    color: primary-text;
    font-size: 18px;
  }
  textarea {
    max-height: 180px;
    background: transparent;
    color: white;
    font-family: monospace;
    margin-top: 14px;
    padding: 0;
    padding-left: 14px;
    width: settings-width - 14px;
    font-size: 18px;
    border: 1px solid transparent;
    &:focus {
      outline: none;
      border: 1px dashed;
      background: #13294f;
    }
  }
}

.row {
  display: flex;
  flex-direction: row;
}
audio {
  width: 100%;
}

.col {
  flex: 1;
}
a {
  text-decoration: none;
}

a.action {
  color: white;
  font-size: 16px;
}

a.toggle-settings {
  position: absolute;
  right: 8px;
  color: #999;
  font-size: 12px;
}
.settings.collapsed {
  height: 24px;
  width: auto;
  padding: 0 7px;
  a.toggle-settings {
    color: white;
    position: static;
    margin: 0;
    top: 0;
    left: 0
  }
}

.reset {
  text-decoration: none;
  color: white;
}

@media (max-width: small-screen) {
  .settings {
    width: 100%;
    top: 42px;
    left: 0;
    .title {
      font-size: 14px;
      text-align: left;
    }
  }
  .settings.collapsed {
    width: 100%;
    height: 38px;
  }
  .vector-field {
    textarea {
      margin-top: 0;
      font-size: 16px;
      width: 100%;
    }
  }
}

</style>
