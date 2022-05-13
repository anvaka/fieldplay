<template>
  <div class='help'>
    <p>Vector field is defined with GLSL language. This is a high level programming language for the graphic card.</p>
    <p>Two most important things you need to know:
      <ul>
        <li>GLSL is strictly typed. Each number <b>must have</b> a dot. E.g. "42" should be written as "42."</li>
        <li>List of available built-in functions is <a href='https://shaderific.com/glsl.html' target='_blank'>available here</a> </li>
      </ul>
    </p>
    <a href="#" @click.prevent='close' class='close'>Close help</a>
  </div>
</template>

<script>
export default {
  name: 'Syntax',
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>