<template>
<div>
  <div ref="editorContainer"></div>
  <div class='error-container'>
    <pre v-if='model.error' class='error hl'>{{model.error}}</pre>
    <pre v-if='model.errorDetail' class='error detail'>{{model.errorDetail}}<span v-if='model.isFloatError'>
Did you forget to add a dot symbol? E.g. <span class='hl'>10</span> should be <span class='hl'>10.</span> and <span class='hl'>42</span> should be <span class='hl'>42.</span>
</span></pre>
  </div>
</div>
</template>

<script>
import bus from '../lib/bus.js';
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/comment/comment.js';
import registerGlslMode from './glslmode';

registerGlslMode(CodeMirror);

function toggleGLSLComment(cm) {
  cm.toggleComment({
    indent: true,
    lineComment: '//'
  });
}

export default {
  name: 'CodeEditor',
  props: ['model'],
  mounted() {
    this.editor = CodeMirror(this.$refs.editorContainer, {
      value: this.model.code || '',
      viewportMargin: Infinity,
      theme: 'glsl',
      mode: 'glsl',
      extraKeys: {
        'Cmd-/': toggleGLSLComment,
        'Ctrl-/': toggleGLSLComment
      }
    });

    this.editor.on('change', () => {
      var newValue = this.editor.getValue();
      if (newValue !== this.model.code) {
        this.model.code = newValue;
      }
    });

    bus.on('settings-collapsed', this.onSettingsCollapsed, this);
  },
  beforeUnmount() {
    bus.off('settings-collapsed', this.onSettingsCollapsed, this);
  },
  watch: {
    'model.code': function(newVal) {
      if (this.editor && newVal !== this.editor.getValue()) {
        this.editor.setValue(newVal);
      }

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
  },
  methods: {
    onSettingsCollapsed(isCollapsed) {
      // Code mirror sometimes is not visible https://stackoverflow.com/questions/8349571/codemirror-editor-is-not-loading-content-until-clicked
      if (!isCollapsed) {
        setTimeout(() => {
          this.editor.refresh();
        }, 10);
      }
    }
  }
}
</script>
