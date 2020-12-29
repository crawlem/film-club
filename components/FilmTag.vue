<template>
  <span class="tag badge" :class="classObject">{{ tag }}</span>
</template>

<script>
export default {
  name: 'FilmTag',
  props: {
    tag: {
      type: String,
      default: ''
    }
  },
  computed: {
    classObject () {
      return {
        'badge-warning': this.tag === 'Thriller',
        'badge-success': this.tag === 'Animation',
        'badge-info': this.tag === 'Comedy',
        'badge-dark': this.tag === 'Drama',
        'badge-danger': this.tag === 'Horror',
        'badge-secondary': this.tag === 'Documentary'
      }
    }
  }
}
</script>

<style>
.tag {
  margin-right: .5em;
}
</style>
