<template>
  <div>
    <div class='input-border'>
      <div class='col full'>
        <input type='text' class='link' placeholder="Enter link to image here" v-model='input0Link' @keyup.enter='onSubmit' autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
        <div class='label'>input0</div>
      </div>
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

<style lang="stylus">
@import "./shared.styl";

.input-border {
  margin-top: 10px;
  padding-top: 10px;

  .label {
    font-size: small;
    color: ternary-text;
  }

  input[type='text'].link {
    margin-left: 0;
    &:focus {
      outline: none;
      border: 0px transparent;
    }
    &::placeholder {
      color: ternary-text;
    }
  }
}
</style>
