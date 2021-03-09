<template>
  <div class="page page-film">
    <section>
      <h1><FilmTitle :title="film.fields.Name" :release-date="film.tmdb.release_date" /></h1>
      <p v-if="film.tmdb.tagline" class="tagline">
        {{ film.tmdb.tagline }}
      </p>
      <div class="film-content">
        <div class="film-poster">
          <TMDBPoster :src="film.tmdb.poster_path" :width="300" :height="450" :alt="film.fields.Name" />
        </div>
        <div class="film-details">
          <p>
            <span v-for="genre in film.tmdb.genres" :key="genre.id" class="genre">{{ genre.name }}</span>
          </p>
          <p>Directed by <span v-for="director in directors" :key="director.id">{{ director.name }}</span></p>
          <p v-if="runtime">
            Runtime: {{ runtime }}
          </p>
          <div class="synopsis">
            {{ film.tmdb.overview }}
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
import TMDBPoster from '~/components/TMDBPoster.vue'
export default {
  name: 'Film',
  components: {
    FilmRating,
    TMDBPoster
  },
  async asyncData ({ $config, store, route, $tmdb }) {
    // Load all API data
    await store.dispatch('filmStore/loadAllData')

    // Parse the film ID from the URL
    const filmId = route.path.substr(route.path.lastIndexOf('/') + 1)

    // Find that film in our array
    const film = store.state.filmStore.films.filter(film => film.id === filmId)[0]

    // Return data to use in the page
    return {
      filmId,
      film
    }
  },
  computed: {
    reviewDate () {
      const rawDate = this.film.meeting.fields.Date
      return (new Date(rawDate) instanceof Date) ? Moment(new Date(rawDate)).format('D MMMM YYYY') : rawDate
    },
    directors () {
      return this.film.credits.crew.filter(crew => crew.job === 'Director')
    },
    filteredCast () {
      let castList = []
      if (this.film.credits && this.film.credits.cast) {
        castList = this.film.credits.cast.slice(0, 6)
      }
      return castList
    },
    runtime () {
      let duration = ''
      if (this.film.tmdb.runtime) {
        const hours = Math.floor(this.film.tmdb.runtime / 60)
        const hourLabel = (hours === 1) ? 'hour' : 'hours'
        const minutes = this.film.tmdb.runtime % 60
        const minuteLabel = (minutes === 1) ? 'minute' : 'minutes'
        duration = hours + ' ' + hourLabel + ' ' + minutes + ' ' + minuteLabel
      }
      return duration
    }
  }
}
</script>
