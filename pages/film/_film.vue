<template>
  <div class="page page-film">
    <section>
      <h1>{{ film.fields.Name }}</h1>
      <p v-if="tmdb.tagline" class="tagline">
        {{ tmdb.tagline }}
      </p>
      <div class="film-content">
        <div class="film-poster">
          <img :src="imgSrc" :srcset="imgSrcSet" width="300" height="450" alt="">
        </div>
        <div class="film-details">
          <p>
            <span v-for="genre in tmdb.genres" :key="genre.id" class="genre">{{ genre.name }}</span>
          </p>
          <p>Directed by <span v-for="director in directors" :key="director.id">{{ director.name }}</span></p>
          <p v-if="runtime">
            Runtime: {{ runtime }}
          </p>
          <div class="synopsis">
            {{ tmdb.overview }}
          </div>
          <FilmCast :cast="filteredCast" />
        </div>
      </div>
    </section>

    <section v-if="film.meeting && film.meeting.fields.Review" class="review">
      <h1>Review</h1>
      <p>{{ film.meeting.fields.Review }}</p>
      <p>Reviewed: {{ reviewDate }}</p>
      <p>
        <FilmRating :stars="Number(film.meeting.fields.Rating)" />
        ({{ film.meeting.fields.Rating }}/10)
      </p>
    </section>
  </div>
</template>

<script>
import Moment from 'moment'
import FilmRating from '~/components/FilmRating.vue'
export default {
  name: 'Film',
  components: {
    FilmRating
  },
  async asyncData ({ $config, store, route, $tmdb }) {
    // Load all API data
    await store.dispatch('filmStore/loadAllData')

    // Parse the film ID from the URL
    const filmId = route.path.substr(route.path.lastIndexOf('/') + 1)

    // Find that film in our array
    const film = store.state.filmStore.films.filter(film => film.id === filmId)[0]

    // Load details of the film from TMDB
    const tmdbId = film.fields['TMDB ID']
    const tmdbResponse = await $tmdb.get('/movie/' + tmdbId + '?api_key=' + $config.TMDB_API_KEY)
    const tmdbJson = await tmdbResponse.json()

    // Load details of cast/crew from TMDB
    const tmdbCreditsResponse = await $tmdb.get('/movie/' + tmdbId + '/credits?api_key=' + $config.TMDB_API_KEY)
    const tmdbCreditsJson = await tmdbCreditsResponse.json()

    // Return data to use in the page
    return {
      filmId,
      film,
      tmdb: tmdbJson,
      credits: tmdbCreditsJson
    }
  },
  computed: {
    imgSrc () {
      return this.$config.TMDB_IMG_PATH_1X + this.tmdb.poster_path
    },
    imgSrcSet () {
      return this.imgSrc + ' 1x, ' + this.$config.TMDB_IMG_PATH_2X + this.tmdb.poster_path + ' 2x'
    },
    reviewDate () {
      const rawDate = this.film.meeting.fields.Date
      return (new Date(rawDate) instanceof Date) ? Moment(new Date(rawDate)).format('D MMMM YYYY') : rawDate
    },
    directors () {
      return this.credits.crew.filter(crew => crew.job === 'Director')
    },
    filteredCast () {
      let castList = []
      if (this.credits && this.credits.cast) {
        castList = this.credits.cast.slice(0, 6)
      }
      return castList
    },
    runtime () {
      let duration = ''
      if (this.tmdb.runtime) {
        const hours = Math.floor(this.tmdb.runtime / 60)
        const hourLabel = (hours === 1) ? 'hour' : 'hours'
        const minutes = this.tmdb.runtime % 60
        const minuteLabel = (minutes === 1) ? 'minute' : 'minutes'
        duration = hours + ' ' + hourLabel + ' ' + minutes + ' ' + minuteLabel
      }
      return duration
    }
  }
}
</script>
