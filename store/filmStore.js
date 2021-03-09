export const state = () => ({
  meetings: [],
  films: []
})

export const mutations = {
  STORE_MEETINGS (state, meetings) {
    state.meetings = meetings
  },
  STORE_FILMS (state, films) {
    state.films = films
  }
}

export const actions = {
  // Retrieve all relevant film/meeting/review data
  async loadAllData (context) {
    // Only load if we haven't already got data
    if (context.state.films.length === 0) {
      // eslint-disable-next-line
      console.log('Reloading films data')

      // Load all films that have a status assigned
      const filmsResponse = await this.$airtable.get('/Films?filterByFormula=NOT({Status} = \'\')') // &maxRecords=6
      const filmsJson = await filmsResponse.json()

      // Load all meetings, past and future
      const meetingsResponse = await this.$airtable.get('/Meetings?sort[0][field]=Date&sort[0][direction]=desc') // &filterByFormula={Date} >= TODAY()
      const meetingsJson = await meetingsResponse.json()

      // Add film details to meetings
      meetingsJson.records.forEach(function (meeting) {
        if (meeting.fields.Film && meeting.fields.Film.length > 0) {
          const film = filmsJson.records.find(film => film.id === meeting.fields.Film[0])
          meeting.film = film
        }
      })

      // Add meeting details to films
      filmsJson.records.forEach(function (film) {
        // Meeting info
        const meeting = meetingsJson.records.find(meeting => meeting.fields.Film[0] === film.id)
        if (meeting) {
          film.meeting = meeting
        }
      })

      // Add TMDB info to films
      for (const film of filmsJson.records) {
        // Load details of the film from TMDB
        const tmdbId = film.fields['TMDB ID']
        const tmdbResponse = await this.$tmdb.get('/movie/' + tmdbId + '?api_key=' + this.$config.TMDB_API_KEY)
        const tmdbJson = await tmdbResponse.json()
        film.tmdb = tmdbJson

        // Load details of cast/crew from TMDB
        const tmdbCreditsResponse = await this.$tmdb.get('/movie/' + tmdbId + '/credits?api_key=' + this.$config.TMDB_API_KEY)
        const tmdbCreditsJson = await tmdbCreditsResponse.json()
        film.credits = tmdbCreditsJson
      }

      // Save to state
      context.commit('STORE_FILMS', filmsJson.records)
      context.commit('STORE_MEETINGS', meetingsJson.records)
    }
  }
}
