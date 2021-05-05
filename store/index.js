import Airtable from 'airtable'

let filmCache = []
let meetingCache = []

async function cacheFilms (airtableApiKey, airtableBaseId, tmdb) {
  if (!filmCache.length) {
    const airtable = new Airtable({ apiKey: airtableApiKey }).base(airtableBaseId)

    // eslint-disable-next-line
    console.log('Caching films data')

    const films = []

    // Load all films that have a status assigned
    await airtable.table('Films').select({
      filterByFormula: 'NOT({Status} = \'\')'
    }).eachPage(function page (records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(function (record) {
        // eslint-disable-next-line
        console.log('Retrieved film', record.get('Name'))
        films.push({
          id: record.id,
          fields: {
            Name: record.get('Name'),
            'TMDB ID': record.get('TMDB ID'),
            Status: record.get('Status')
          }
        })
      })

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage()
    })

    // Add TMDB info to films
    for (const film of films) {
      // eslint-disable-next-line
      console.log('Adding TMDB data to', film.id)

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

    filmCache = films
  } else {
    // eslint-disable-next-line
    console.log('Using cached films data')
  }

  return filmCache
}

async function cacheMeetings (airtableApiKey, airtableBaseId) {
  if (!meetingCache.length) {
    const airtable = new Airtable({ apiKey: airtableApiKey }).base(airtableBaseId)

    // eslint-disable-next-line
    console.log('Caching meeting data')

    const meetings = []

    // Load all meetings, past and future
    await airtable.table('Meetings').select({
      sort: [{ field: 'Date', direction: 'desc' }]
    }).eachPage(function page (records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(function (record) {
        // eslint-disable-next-line
        console.log('Retrieved meeting', record.get('Date'))
        meetings.push({
          id: record.id,
          fields: {
            Date: record.get('Date'),
            Film: record.get('Film'),
            Review: record.get('Review'),
            Rating: record.get('Rating')
          }
        })
      })

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage()
    })

    meetingCache = meetings
  } else {
    // eslint-disable-next-line
    console.log('Using cached meeting data')
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
  async nuxtServerInit ({ commit }, { $config }) {
    const f = await cacheFilms($config.AIRT_API_KEY, $config.AIRT_API_BASE_ID, this.$tmdb)
    const m = await cacheMeetings($config.AIRT_API_KEY, $config.AIRT_API_BASE_ID)

    await populateFilmsWithMeetingData(f, m)
    await populateMeetingsWithFilmData(m, f)

    // Save to state
    await commit('STORE_FILMS', f)
    await commit('STORE_MEETINGS', m)
  }
}
