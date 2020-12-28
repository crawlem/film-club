<template>
  <div class="container">
    <h2>Backlog</h2>
    <div class="films-list">
      <Film v-for="film in backlog" :key="film.ID" :film="film" />
    </div>
  </div>
</template>

<script>
import Film from '~/components/film.vue'
export default {
  name: 'Backlog',
  components: {
    Film
  },
  async asyncData ({ $axios }) {
    const { data } = await $axios.get('/Films?view=Backlog')
    return { backlog: data.records }
  }
}
</script>

<style scoped>
</style>
