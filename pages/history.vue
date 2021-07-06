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
      const filmList = this.$store.state.films.filter(film => film.fields.Status === 'Watched')
      // Sort by meeting date descending
      filmList.sort((a, b) => {
        const da = new Date(a.meeting.fields.Date)
        const db = new Date(b.meeting.fields.Date)
        return db - da
      })
      return filmList
    }
  }
}
</script>
