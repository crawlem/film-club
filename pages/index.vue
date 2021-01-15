<template>
  <div class="home">
    <section>
      <p class="title-hero">
        Welcome to film club! Here's what we've been watching...
      </p>

      <h2>Previously at film club</h2>
      <FilmList :list="history" :show-ratings="true" />
    </section>

    <section title="Next meeting" class="col-sm">
      <div class="card nextMeeting h-100">
        <h2 class="card-header">
          Next meeting
        </h2>
        <!-- <img /> -->
        <div class="card-body">
          <h3 class="card-title">
            <span>{{ meetingDate }}</span>
          </h3>
          <p class="card-text">
            The film we will <strong>review</strong> next time is
            <a v-if="nextMeeting.url" :href="nextMeeting.url" target="_blank">{{ nextMeeting.filmTitle }}</a>
            <span v-else>{{ nextMeeting.filmTitle }}</span>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Moment from 'moment'
import FilmList from '~/components/FilmList.vue'
export default {
  components: {
    FilmList
  },
  async asyncData ({ $config, $airtable, store }) {
    // Retrieve most recently watched films
    await store.dispatch('films/loadHistory')

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
    },
    history () {
      return this.$store.state.films.history
    }
  },
  methods: {
    ...mapMutations({
      loadHistory: 'films/loadHistory'
    })
  }
}
</script>
