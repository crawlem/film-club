<template>
  <span class="film-tag" :class="classObject">{{ tag }}</span>
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
        'tag-thriller': this.tag === 'Thriller',
        'tag-animation': this.tag === 'Animation',
        'tag-comedy': this.tag === 'Comedy',
        'tag-drama': this.tag === 'Drama',
        'tag-horror': this.tag === 'Horror',
        'tag-documentary': this.tag === 'Documentary',
        'tag-action': this.tag === 'Action',
        'tag-scifi': this.tag === 'Sci-fi'
      }
    }
  }
}
</script>
