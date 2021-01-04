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
              <a v-if="nextMeeting.url" :href="nextMeeting.url" target="_blank">{{ nextMeeting.filmTitle }}</a>
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
import Moment from 'moment'
import FilmList from '~/components/FilmList.vue'

export default {
  components: {
    FilmList
  },
  async asyncData ({ $config, $airtable }) {
    // Retrieve most recently watched films
    const historyResponse = await $airtable.get('/Films?view=History&maxRecords=3')
    const history = await historyResponse.json()

    // Retrieve next meeting date/film
    const nextMeetingResponse = await $airtable.get('/Meetings?maxRecords=1&sort[0][field]=Date&sort[0][direction]=desc&filterByFormula={Date} >= TODAY()')
    const nextMeeting = await nextMeetingResponse.json()

    let nextMeetingDate = 'Not booked'
    let nextFilmTitle = 'TBC'
    let nextFilmUrl = null

    if (Array.isArray(nextMeeting.records) && nextMeeting.records.length > 0) {
      nextMeetingDate = nextMeeting.records[0].fields.Date
      if ('Film' in nextMeeting.records[0].fields) {
        // Get details of the upcoming film
        const nextFilmResponse = await $airtable.get('/Films/' + nextMeeting.records[0].fields.Film)
        const nextFilm = await nextFilmResponse.json()

        nextFilmTitle = nextFilm.fields.Name
        if ('ReelGood link' in nextFilm.fields) {
          nextFilmUrl = nextFilm.fields['ReelGood link']
        }
      }
    }

    return {
      history: history.records,
      nextMeeting: {
        date: nextMeetingDate,
        filmTitle: nextFilmTitle,
        url: nextFilmUrl
      }
    }
  },
  computed: {
    meetingDate () {
      return (Moment(new Date(this.nextMeeting.date)).isValid()) ? Moment(new Date(this.nextMeeting.date)).format('dddd Do MMMM gggg') : this.nextMeeting.date
    }
  }
}
</script>
