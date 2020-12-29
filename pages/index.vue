<template>
  <div>
    <div class="jumbotron container-fluid">
      <h2 class="display-4">
        Welcome to film club
      </h2>
      <p class="lead">
        We review a film together each month.
      </p>
    </div>

    <section title="Next meeting" class="container-sm mb-4">
      <div class="card">
        <h4 class="card-header">
          Next meeting
        </h4>
        <!-- <img /> -->
        <div class="card-body">
          <h5 class="card-title">
            Date
          </h5>
          <p class="card-text">
            Our next meeting is x y z
          </p>
        </div>
      </div>
    </section>

    <section title="Recently watched" class="container-fluid">
      <h3>Recently watched</h3>
      <FilmList :list="history" />
    </section>
  </div>
</template>

<script>import FilmList from '~/components/FilmList.vue'
export default {
  components: {
    FilmList
  },
  async asyncData ({ $axios }) {
    const { data } = await $axios.get('/Films?view=History&maxRecords=3')
    return { history: data.records }
  }
}
</script>

<style>
</style>
