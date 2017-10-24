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
      <ruler></ruler>
      <settings :scene='scene'></settings>
      <controls></controls>
      <share></share>
    </div>
  </div>
</template>

<script>
import Ruler from './components/Ruler';
import Settings from './components/Settings';
import Controls from './components/Controls';
import Share from './components/Share';
import bus from './lib/bus';

export default {
  name: 'app',
  mounted() {
    this.scene = window.scene;
    bus.fire('scene-ready', window.scene);
  },
  data() {
    return {
      scene: null,
      webGLEnabled: window.webgGLEnabled
    };
  },
  components: {
    Ruler,
    Settings,
    Controls,
    Share
  },

  beforeDestroy() {
    if (this.scene) {
      this.scene.dispose();
      this.scene = null;
    }
  },
}
</script>

<style lang='styl'>
@import './components/shared.styl';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.no-webgl {
  width: 100%;
  color: hsla(215, 37%, 55%, 1);
  flex-direction: column;
  text-align: center;
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
</style>
