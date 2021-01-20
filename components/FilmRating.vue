<template>
  <span class="rating" :class="'rating-' + stars">
    <span v-for="i in stars" :key="i">★</span><span v-for="x in (5 - stars)" :key="x">☆</span>
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
