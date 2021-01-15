<template>
  <ul class="film-list">
    <li v-for="film in list" :key="film.id" class="film-item">
      <FilmItem :film="film" :show-rating="showRatings" />
    </li>
  </ul>
</template>

<script>
import FilmItem from '~/components/FilmItem.vue'
export default {
  name: 'FilmList',
  components: {
    FilmItem
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    showReviews: {
      type: Boolean,
      default: false
    },
    showRatings: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.films-list {
    display: flex;
    flex-wrap: wrap;
}

.films-list .film {
    margin: 0 5px 5px 0;
}
</style>
