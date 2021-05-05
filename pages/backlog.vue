<template>
  <div class="page page-backlog">
    <section>
      <h1>Backlog to watch</h1>
      <FilmList :list="backlog" />
    </section>
  </div>
</template>

<script>
import FilmList from '~/components/FilmList.vue'
export default {
  name: 'Backlog',
  components: {
    FilmList
  },
  computed: {
    backlog () {
      return this.$store.state.films.filter(film => film.fields.Status === 'Added')
    }
  }
}
</script>
