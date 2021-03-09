<template>
  <img :imgSrc="src" :srcset="imgSrcSet" :width="width" :height="height" :alt="alt">
</template>

<script>
export default {
  name: 'FilmPoster',
  props: {
    src: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 225
    },
    alt: {
      type: String,
      default: ''
    }
  },

  computed: {
    imgSrc () {
      return this.$config.TMDB_IMG_PATH_1X + this.src
    },
    imgSrcSet () {
      return this.imgSrc + ' 1x, ' + this.$config.TMDB_IMG_PATH_2X + this.src + ' 2x'
    }
  }
}
</script>
