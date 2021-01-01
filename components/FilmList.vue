<template>
  <div class="films-list">
    <FilmItem v-for="film in list" :key="film.id" :film="film" />
  </div>
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
