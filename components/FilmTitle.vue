<template>
  <span>{{ title }} <span v-if="year">({{ year }})</span></span>
</template>
<script>
import Moment from 'moment'
export default {
  name: 'FilmTitle',
  props: {
    title: {
      type: String,
      default: ''
    },
    releaseDate: {
      type: String,
      default: ''
    }
  },

  computed: {
    year () {
      const rawDate = this.releaseDate
      return (Moment(new Date(rawDate)).isValid()) ? Moment(new Date(rawDate)).format('YYYY') : rawDate
    }
  }
}
</script>
