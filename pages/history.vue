<template>
  <div class="page page-history">
    <section>
      <h1>Films we have watched</h1>
      <FilmList :list="history" :show-ratings="true" />
    </section>
  </div>
</template>

<script>
import FilmList from '~/components/FilmList.vue'
export default {
  name: 'History',
  components: {
    FilmList
  },
  computed: {
    history () {
      return this.$store.state.films.filter(film => film.fields.Status === 'Watched')
    }
  }
}
</script>
