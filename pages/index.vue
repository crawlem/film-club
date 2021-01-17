<template>
  <div class="home">
    <section>
      <p class="title-hero">
        Welcome to film club! Here's what we've been watching...
      </p>
    </section>

    <section>
      <h2>Previously at film club</h2>
      <FilmList :list="history" :show-ratings="true" />
    </section>

    <section>
      <h2>Backlog</h2>
      <div class="teaser-link">
        <a href="/backlog">See more</a>
      </div>
      <FilmList :list="backlog" />
    </section>

    <section title="Next meeting" class="col-sm">
      <div class="card nextMeeting h-100">
        <h2 class="card-header">
          Next meeting
        </h2>
        <div class="card-body">
          <h3 class="card-title">
            <span>{{ nextMeetingDate }}</span>
          </h3>
          <p class="card-text">
            The film we will review next time is
            <a v-if="nextMeeting.film.fields['ReelGood link']" :href="nextMeeting.film.fields['ReelGood link']" target="_blank">{{ nextMeeting.film.fields.Name }}</a>
            <span v-else>{{ nextMeeting.film.fields.Name }}</span>
          </p>
        </div>
      </div>
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
  async asyncData ({ $config, store }) {
    await store.dispatch('films/loadAllData')
  },
  computed: {
    history () {
      return this.$store.state.filmStore.films.filter(film => film.fields.Status === 'Watched')
    },
    backlog () {
      return this.$store.state.filmStore.films.filter(film => film.fields.Status === 'Added').slice(0, 6)
    },
    nextMeeting () {
      return this.$store.state.filmStore.meetings[0]
    },
    nextMeetingDate () {
      const rawDate = this.nextMeeting.fields.Date
      return (Moment(new Date(rawDate)).isValid()) ? Moment(new Date(rawDate)).format('dddd Do MMMM gggg') : rawDate
    }
  }
}
</script>
