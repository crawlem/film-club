<template>
  <span class="rating" :class="'rating-' + stars">
    ★★★★☆
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
