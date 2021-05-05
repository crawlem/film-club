let filmCache = []
let meetingCache = []

async function cacheFilms (airtable, tmdb) {
  if (!filmCache.length) {
    // eslint-disable-next-line
    console.log('Caching films data')

    // Load all films that have a status assigned
    const filmsResponse = await airtable.get('/Films?filterByFormula=NOT({Status} = \'\')') // &maxRecords=6
    const filmsJson = await filmsResponse.json()

    // Add TMDB info to films
    for (const film of filmsJson.records) {
      // Load details of the film from TMDB
      const tmdbId = film.fields['TMDB ID']
      const tmdbResponse = await tmdb.get('/movie/' + tmdbId)
      const tmdbJson = await tmdbResponse.json()
      film.tmdb = tmdbJson

      // Load details of cast/crew from TMDB
      const tmdbCreditsResponse = await tmdb.get('/movie/' + tmdbId + '/credits')
      const tmdbCreditsJson = await tmdbCreditsResponse.json()
      film.credits = tmdbCreditsJson
    }

    filmCache = filmsJson.records
  } else {
    // eslint-disable-next-line
    console.log('Using cached films data')
  }

  return filmCache
}

async function cacheMeetings (airtable) {
  if (!meetingCache.length) {
    // Load all meetings, past and future
    const meetingsResponse = await airtable.get('/Meetings?sort[0][field]=Date&sort[0][direction]=desc') // &filterByFormula={Date} >= TODAY()
    const meetingsJson = await meetingsResponse.json()

    meetingCache = meetingsJson.records
  }

  return meetingCache
}

function populateMeetingsWithFilmData (meetings, films) {
  // Add film details to meetings
  meetings.forEach(function (meeting) {
    if (meeting.fields.Film && meeting.fields.Film.length > 0) {
      const film = films.find(film => film.id === meeting.fields.Film[0])
      meeting.film = film
    }
  })
}

function populateFilmsWithMeetingData (films, meetings) {
  // Add meeting details to films
  films.forEach(function (film) {
    // Meeting info
    const meeting = meetings.find(meeting => meeting.fields.Film[0] === film.id)
    if (meeting) {
      film.meeting = meeting
    }
  })
}

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
  async nuxtServerInit ({ commit }, { context }) {
    const f = await cacheFilms(this.$airtable, this.$tmdb)
    const m = await cacheMeetings(this.$airtable)

    await populateFilmsWithMeetingData(f, m)
    await populateMeetingsWithFilmData(m, f)

    // Save to state
    await commit('STORE_FILMS', f)
    await commit('STORE_MEETINGS', m)
  }
}
