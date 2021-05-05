<template>
  <div class="page page-home">
    <section>
      <p class="title-hero">
        Welcome to film club! Here's what we've been watching...
      </p>
    </section>

    <section>
      <h1>Next meeting: {{ nextMeetingDate }}</h1>
      <FilmList :list="new Array(nextMeeting.film)" />
    </section>

    <section>
      <h1>Previously at film club</h1>
      <FilmList :list="history" :show-ratings="true" />
    </section>

    <section>
      <h1>Backlog to watch</h1>
      <div class="teaser-link">
        <NuxtLink to="/backlog">
          See more
        </NuxtLink>
      </div>
      <FilmList :list="backlog" />
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
  computed: {
    history () {
      // Return the "Watched" films from our list
      const filmList = this.$store.state.films.filter(film => film.fields.Status === 'Watched')
      // Sort by meeting date descending
      filmList.sort((a, b) => {
        const da = new Date(a.meeting.fields.Date)
        const db = new Date(b.meeting.fields.Date)
        return db - da
      })
      // Return the last 6 films
      return filmList.slice(0, 6)
    },
    backlog () {
      return this.$store.state.films.filter(film => film.fields.Status === 'Added').slice(0, 6)
    },
    nextMeeting () {
      return this.$store.state.meetings[0]
    },
    nextMeetingDate () {
      const rawDate = (this.nextMeeting) ? this.nextMeeting.fields.Date : ''
      return (Moment(new Date(rawDate)).isValid()) ? Moment(new Date(rawDate)).format('Do MMM gggg') : rawDate
    }
  }
}
</script>
