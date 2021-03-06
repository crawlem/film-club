<template>
  <span class="rating" :class="'rating-' + stars">
    <span v-for="i in Math.floor(stars / 2)" :key="i">★</span><span v-if="stars % 2">½</span>
    <!-- <span v-for="x in (5 - stars)" :key="x">☆</span> -->
  </span>
</template>

<script>
export default {
  name: 'FilmRating',
  props: {
    stars: {
      type: Number,
      default: 0
    }
  }
}
</script>
