<template>
  <div class="film">
    <div class="film-poster">
      <NuxtLink :to="'/film/' + film.id" class="film-link">
        <TMDBPoster :src="film.tmdb.poster_path" :width="150" :height="225" :alt="film.fields.Name" />
        <h2 class="film-title">
          {{ film.fields.Name }}
        </h2>
      </NuxtLink>
    </div>
    <div v-if="showRating && film.meeting && film.meeting.fields.Rating" class="film-icons">
      <FilmRating :stars="Number(film.meeting.fields.Rating)" /> <span class="rating-date">{{ reviewDate }}</span>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'
import FilmRating from '~/components/FilmRating.vue'
import TMDBPoster from '~/components/TMDBPoster.vue'
export default {
  name: 'FilmItem',
  components: {
    FilmRating,
    TMDBPoster
  },
  props: {
    film: {
      type: Object,
      default () {
        return {
          fields: {
            Name: 'Undefined'
          }
        }
      }
    },
    showReview: {
      type: Boolean,
      default () {
        return false
      }
    },
    showRating: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imgSrc () {
      return ('Poster' in this.film.fields) ? this.film.fields.Poster[0].thumbnails.large.url : '/images/blank.png'
    },
    reviewDate () {
      const rawDate = this.film.meeting.fields.Date
      return (Moment(new Date(rawDate)).isValid()) ? Moment(new Date(rawDate)).format('MMM YY') : rawDate
    }
  }
}
</script>
