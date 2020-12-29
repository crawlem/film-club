<template>
  <div>
    <div class="jumbotron container-fluid">
      <h2 class="display-4">
        Backlog
      </h2>
      <p class="lead">
        These films are on our backlog to watch at some point in future.
      </p>
    </div>

    <section title="Upcoming films" class="container-fluid">
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
  async asyncData ({ $axios }) {
    const { data } = await $axios.get('/Films?view=Backlog')
    return { backlog: data.records }
  }
}
</script>

<style scoped>
</style>
