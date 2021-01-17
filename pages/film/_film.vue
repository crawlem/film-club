<template>
  <div class="film">
    <section>
      <h2>{{ film.fields.Name }}</h2>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Film',
  async asyncData ({ $config, store, route, $tmdb }) {
    // Load all API data
    await store.dispatch('films/loadAllData')

    // Parse the film ID from the URL
    const filmId = route.path.substr(route.path.lastIndexOf('/') + 1)

    // Find that film in our array
    const film = store.state.filmStore.films.filter(film => film.id === filmId)[0]
    console.log(film)

    // Load details of the film from TMDB
    const tmdbId = film.fields['TMDB ID']
    // console.log(tmdbId)
    // const tmdbResponse = await $tmdb.get('/movie/' + tmdbId)
    // const tmdbJson = await tmdbResponse.json()
    // console.log(tmdbJson)

    // Return data to use in the page
    return {
      filmId,
      film,
      tmdb: tmdbId
    }
  }
}
</script>
