<template>
  <div class="film">
    <div class="film-poster">
      <a :href="'/film/' + film.id" class="film-link">
        <img
          :src="imgSrc"
          width="150"
          height="225"
          :alt="film.fields.Name"
        >
        <ul class="film-tag-list">
          <li v-for="tag in film.fields.Genre" :key="tag" class="film-tag-item">
            <FilmTag :tag="tag" />
          </li>
        </ul>
      </a>
    </div>
    <div v-if="showRating && film.meeting && film.meeting.fields.Rating" class="film-icons">
      <FilmRating :stars="Number(film.meeting.fields.Rating)" /> <span class="rating-date">{{ reviewDate }}</span>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'
import FilmTag from '~/components/FilmTag.vue'
import FilmRating from '~/components/FilmRating.vue'
export default {
  name: 'FilmItem',
  components: {
    FilmTag,
    FilmRating
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
