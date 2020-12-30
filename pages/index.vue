<template>
  <div class="container-fluid">
    <div class="row">
      <div class="jumbotron col mb-0">
        <h2 class="display-4">
          Welcome to film club
        </h2>
        <p class="lead">
          We review a film together each month.
        </p>
      </div>

      <section title="Next meeting" class="col-sm">
        <div class="card nextMeeting h-100">
          <h4 class="card-header">
            Next meeting
          </h4>
          <!-- <img /> -->
          <div class="card-body">
            <h5 class="card-title">
              <span>{{ meetingDate }}</span>
            </h5>
            <p class="card-text">
              The film we will review next time is
              <a v-if="nextMeeting.url" :href="nextMeeting.url">{{ nextMeeting.filmTitle }}</a>
              <span v-else>{{ nextMeeting.filmTitle }}</span>
            </p>
          </div>
        </div>
      </section>
    </div>

    <section title="Recently watched" class="container-fluid mt-4">
      <h3>Recently watched</h3>
      <FilmList :list="history" />
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import FilmList from '~/components/FilmList.vue'
export default {
  components: {
    FilmList
  },
  async asyncData ({ $axios }) {
    const { data } = await $axios.get('/Films?view=History&maxRecords=3')

    const nextMeeting = await $axios.get('/Meetings?maxRecords=1&sort[0][field]=Date&sort[0][direction]=desc&filterByFormula={Date} >= TODAY()')

    let nextMeetingDate = 'Not booked'
    let nextFilmTitle = 'TBC'
    let nextFilmUrl = null

    if (Array.isArray(nextMeeting.data.records) && nextMeeting.data.records.length > 0) {
      nextMeetingDate = nextMeeting.data.records[0].fields.Date
      if ('Film' in nextMeeting.data.records[0].fields) {
        const nextFilm = await $axios.get('/Films/' + nextMeeting.data.records[0].fields.Film)
        nextFilmTitle = nextFilm.data.fields.Name
        nextFilmUrl = nextFilm.data.fields['JustWatch link']
      }
    }

    return {
      history: data.records,
      nextMeeting: {
        date: nextMeetingDate,
        filmTitle: nextFilmTitle,
        url: nextFilmUrl
      }
    }
  },
  computed: {
    meetingDate () {
      return (moment(this.nextMeeting.date).isValid()) ? moment(this.nextMeeting.date).format('dddd Do MMMM gggg') : this.nextMeeting.date
    }
  }
}
</script>
