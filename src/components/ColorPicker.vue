<template>
  <div>
    <input type='text' @click.prevent='showPicker' :value='color' readonly class='color-label'>
    <div class='picker' @click='hidePicker' v-if='opened' ref='pickerOverlay'>
      <chrome-color-picker :value='color' :style='getPickerStyle()' @input='onChanged'></chrome-color-picker>
    </div>
  </div>
</template>

<script>
import { Chrome } from 'vue-color';
export default {
  name: 'ColorPicker',
  props: ['color'],
  components: {
    'chrome-color-picker': Chrome
  },
  data() {
    return {
      opened: false,
    }
  },
  methods: {
    showPicker() {
      this.opened = true;
    },
    hidePicker(e) {
      if (e.target === this.$refs.pickerOverlay) this.opened = false;
    },
    getPickerStyle() {
      let rect = this.$el.getBoundingClientRect();
      return {
        position: 'absolute',
        left: (rect.left - 30) + 'px',
        top: (rect.top - 179) + 'px'
      }
    },
    onChanged(e) {
      this.$emit('changed', e.rgba);
    }
  }
}
</script>
<style lang='stylus'>
.picker {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.color-label {
  cursor: pointer
}

</style>
