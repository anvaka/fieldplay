<template>
  <div id="app">
    <div v-if='!webGLEnabled'>
      <div class='absolute no-webgl'>
        <h4>WebGL is not enabled :(</h4>
        <p>This website needs <a href='https://en.wikipedia.org/wiki/WebGL' class='highlighted'>WebGL</a> to perform numerical integration.
        </p> <p>
        You can try another browser. If problem persists - very likely your video card isn't supported then.
</p>
      </div>
    </div>
    <div v-if='webGLEnabled'>
      <vector-view v-if='vectorLinesEnabled'></vector-view>
      <ruler></ruler>
      <a href='#' @click.prevent='aboutVisible = !aboutVisible' class='about-link'>about...</a>
      <div class='controls-container' :style='getControlsContainerStyle()' ref='controls'>
        <controls></controls>
        <settings :scene='scene'></settings>
        <div ref='left' class='left resize'></div>
      </div>
      <share></share>
      <about @close='aboutVisible = false' v-if='aboutVisible'></about>
    </div>
  </div>
</template>

<script>
import Controls from './components/Controls';
import Ruler from './components/Ruler';
import Settings from './components/Settings';
import Share from './components/Share';
import About from './components/About';
import bus from './lib/bus';
import isSmallScreen from './lib/isSmallScreen';
import VectorView from './components/VectorView';
import config from './lib/config';
import createDrag from './lib/utils/drag.js';

const MIN_SETTINGS_WIDTH = 395;

export default {
  name: 'app',
  mounted() {
    this.scene = window.scene;
    bus.fire('scene-ready', window.scene);
    this.updateControlsStyle = this.updateControlsStyle.bind(this);
    window.addEventListener('resize', this.updateControlsStyle, true);

    this.resizer = createDrag(this.$refs.left, dx => {
      this.width += dx;
      if (this.width < MIN_SETTINGS_WIDTH) this.width = MIN_SETTINGS_WIDTH;
    });
  },
  beforeDestroy() {
    this.resizer.dispose();
    window.removeEventListener('resize', this.updateControlsStyle, true);
    if (this.scene) {
      this.scene.dispose();
      this.scene = null;
    }
  },
  data() {
    return {
      scene: null,
      width: MIN_SETTINGS_WIDTH,
      webGLEnabled: window.webGLEnabled,
      aboutVisible: false,
      vectorLinesEnabled: config.vectorLinesEnabled
    };
  },
  components: {
    Controls,
    Ruler,
    Settings,
    Share,
    About,
    VectorView
  },
  methods: {
    getControlsContainerStyle() {
      if (isSmallScreen()) return { width: '100%' };

      return {width: this.width + 'px'};
    },
    updateControlsStyle() {
      this.$refs.controls.style.width = this.getControlsContainerStyle().width;
    }
  }
}
</script>

<style lang='styl'>
@import './components/shared.styl';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.controls-container {
  position: absolute;
  max-height: 100%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);

  border: 1px solid primary-border;
  border-left: none;
  border-top: none;
  overflow: hidden;
  flex-direction: column;
  display: flex;

  .settings {
    flex: 1;
  }
}
.resize {
  position: absolute;
}
.resize.left {
  right: -2px;
  height: 100%;
  width: 4px;
  cursor: ew-resize;
  background: transparent;
  top: 0;
}

.no-webgl {
  width: 100%;
  color: hsla(215, 37%, 55%, 1);
  flex-direction: column; text-align: center;
  padding: 12px;
}
a {
  color: primary-text;
  text-decoration: none;
}
a.highlighted {
  color: white;
  border-bottom: 1px dashed white;
}
.no-webgl h4 {
  margin: 7px 0;
  font-size: 24px;
}
.ui-container {
  position: absolute;
}
a.about-link {
  position: absolute;
  left: 7px;
  bottom: 26px;
}

.no-ui {
  a.about-link,
  .controls-container {
    display: none;
  }
}

@media (max-width: small-screen) {
  a.about-link {
    bottom: 14px;
  }

  .controls-container {
    width: 100%;
  }
}
</style>
