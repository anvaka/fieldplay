<template>
  <div class='controls'>
    <a href='#' @click.prevent='togglePaused' class='toggle-pause'>
<svg v-if='!paused' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18" viewBox="0 0 12 14">
<path d="M12 1.5v11q0 0.203-0.148 0.352t-0.352 0.148h-4q-0.203 0-0.352-0.148t-0.148-0.352v-11q0-0.203 0.148-0.352t0.352-0.148h4q0.203 0 0.352 0.148t0.148 0.352zM5 1.5v11q0 0.203-0.148 0.352t-0.352 0.148h-4q-0.203 0-0.352-0.148t-0.148-0.352v-11q0-0.203 0.148-0.352t0.352-0.148h4q0.203 0 0.352 0.148t0.148 0.352z"></path>
</svg>
<svg v-if='paused' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18" viewBox="0 0 12 14">
<path d="M10.812 7.242l-10.375 5.766q-0.18 0.102-0.309 0.023t-0.129-0.281v-11.5q0-0.203 0.129-0.281t0.309 0.023l10.375 5.766q0.18 0.102 0.18 0.242t-0.18 0.242z"></path>
</svg>
    </a>
    <a href='#' @click.prevent='generateNewFunction'>Randomize</a>
    <a href='#' @click.prevent='toggleSettings' class='action'>{{(settingsPanel.collapsed ? "Advanced..." : "Hide settings")}}</a>
    <a href='#' @click.prevent='openShareDialog' class='share-btn' title='Share'>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18" viewBox="0 0 12 14">
<path d="M9.5 8q1.039 0 1.77 0.73t0.73 1.77-0.73 1.77-1.77 0.73-1.77-0.73-0.73-1.77q0-0.094 0.016-0.266l-2.812-1.406q-0.719 0.672-1.703 0.672-1.039 0-1.77-0.73t-0.73-1.77 0.73-1.77 1.77-0.73q0.984 0 1.703 0.672l2.812-1.406q-0.016-0.172-0.016-0.266 0-1.039 0.73-1.77t1.77-0.73 1.77 0.73 0.73 1.77-0.73 1.77-1.77 0.73q-0.984 0-1.703-0.672l-2.812 1.406q0.016 0.172 0.016 0.266t-0.016 0.266l2.812 1.406q0.719-0.672 1.703-0.672z"></path>
</svg>
</a>
  </div>
</template>

<script>
import appState from '../lib/appState';
import bus from '../lib/bus';

export default {
  data() {
    return {
        paused: false,
        settingsPanel: appState.settingsPanel
    }
  },

  methods: {
    generateNewFunction() {
      bus.fire('generate-field');
    },
    togglePaused() {
      this.paused = !this.paused;
      window.scene.setPaused(this.paused);
    },
    toggleSettings() {
      this.settingsPanel.collapsed = !this.settingsPanel.collapsed;
    },
    openShareDialog() {
      bus.fire('open-share-dialog');
    }
  }
}
</script>
<style lang='stylus'>
@import "./shared.styl";

a svg {
  fill: white;
}
.controls {
  display: flex;
  position: absolute;
  top: 0px;
  height: control-bar-height;
  width: settings-width;
  left: 0;
  background-color: window-background;
  border-bottom: 1px solid secondary-text;

  a {
    padding: 8px;
    display: flex;
    flex: 1;
    border-right: 1px solid secondary-text;
    justify-content: center;
    align-items: center;
  }
  a.share-btn {
    display: none;
    svg {
      fill: white;
    }
  }
  a.toggle-pause {
    flex: 0.3;
  }
}

@media (max-width: small-screen) {
  .controls {
    top: 0;
    width: 100%;
    a.share-btn {
      flex: none;
      display: flex;
      width: 42px;
    }
  }
}

</style>
