<template>
  <li :class="tag">
    {{ tag }}
  </li>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    tag: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
  li {
    display: inline;
    border-radius: .5em;
    padding: .3em;
    background-color: #ccc;
  }

  .Thriller {
    background-color: aquamarine;
  }
</style>
