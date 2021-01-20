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
        const meeting = meetingsJson.records.find(meeting => meeting.fields.Film[0] === film.id)
        if (meeting) {
          film.meeting = meeting
        }
      })

      // Save to state
      context.commit('STORE_FILMS', filmsJson.records)
      context.commit('STORE_MEETINGS', meetingsJson.records)
    }
  }
}
