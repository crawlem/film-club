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
  async asyncData ({ $config, store }) {
    await store.dispatch('filmStore/loadAllData')
  },
  computed: {
    backlog () {
      return this.$store.state.filmStore.films.filter(film => film.fields.Status === 'Added')
    }
  }
}
</script>
