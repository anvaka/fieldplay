<template>
  <div>
    <div class='row'>
        <div class='col'>input0</div>
        <div class='col full'>
          <input type='text' placeholder="Enter link to image here" v-model='input0Link' @keyup.enter='onSubmit' autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inputs',
  props: ['vm'],
  beforeDestroy() {
    if (this.pendingUpdate) {
      clearTimeout(this.pendingUpdate);
    }
  },
  data() {
    return {
      input0Link: ''
    };
  },
  watch: {
    input0Link() {
      if (this.pendingUpdate) {
        clearTimeout(this.pendingUpdate);
      }

      this.pendingUpdate = setTimeout(() => {
        this.vm.setBinding(0, this.input0Link);
        this.pendingUpdate = 0;
      }, 500);
    }
  },
  methods: {
    onSubmit() {
      
    }
  }
}
</script>
