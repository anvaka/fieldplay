<template>
<div>
  <codemirror v-model='model.code' ref='editor' :options="{
    viewportMargin: Infinity,
    theme: 'glsl',
    mode: 'glsl',
  }"></codemirror>
  <div class='error-container'>
    <pre v-if='model.error' class='error hl'>{{model.error}}</pre>
    <pre v-if='model.errorDetail' class='error detail'>{{model.errorDetail}}<span v-if='model.isFloatError'>
Did you forget to add a dot symbol? E.g. <span class='hl'>10</span> should be <span class='hl'>10.</span> and <span class='hl'>42</span> should be <span class='hl'>42.</span>
</span></pre>
  </div> 
</div>
</template>

<script>
import bus from '../lib/bus';
import { codemirror } from 'vue-codemirror-lite';
var CodeMirror = require('codemirror/lib/codemirror.js')

var toggleComment = require('codemirror/addon/comment/comment.js');
function toggleGLSLComment(cm) {
  cm.toggleComment({
    indent: true,
    lineComment: '//'
  });
}

require('./glslmode')(CodeMirror);

export default {
  name: 'CodeEditor',
  props: ['model'],
  components: {
    codemirror
  },
  mounted() {
    bus.on('settings-collapsed', refreshEditor, this);
    this.$refs.editor.editor.setOption('extraKeys', {
      'Cmd-/': toggleGLSLComment,
      'Ctrl-/': toggleGLSLComment
    });
  },
  beforeDestroy() {
    bus.off('settings-collapsed', refreshEditor, this);
  },
  watch: {
    'model.code': function() {
      if (this.pendingSetCode) {
        clearTimeout(this.pendingSetCode);
      }

      // We don't want to update code on each key stroke. This would have negative
      // impact on performance.
      this.pendingSetCode = setTimeout(() => {
        this.model.setCode(this.model.code);
        this.pendingSetCode = 0;
      }, 300);
    },
  }
}

function refreshEditor(isCollapsed) {
  // Code mirror sometimes is not visible https://stackoverflow.com/questions/8349571/codemirror-editor-is-not-loading-content-until-clicked
  if (!isCollapsed) {
    setTimeout(() => {
      this.$refs.editor.editor.refresh()
    }, 10);
  }
}
</script>