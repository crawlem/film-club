export const state = () => ({
  history: [],
  meetings: [],
  backlog: []
})

export const mutations = {
  STORE_HISTORY (state, films) {
    state.history = films.records
  },
  STORE_BACKLOG (state, films) {
    state.backlog = films.records
  }
}

export const actions = {
  // Retrieve most recently watched films
  async loadHistory ({ commit }) {
    // eslint-disable-next-line no-console
    console.log('Retrieving history')
    const historyResponse = await this.$airtable.get('/Films?view=History&maxRecords=6')
    const historyJson = await historyResponse.json()
    commit('STORE_HISTORY', historyJson)
  },

  // Retrieve backlog of films to watch
  async loadBacklog ({ commit }) {
    // eslint-disable-next-line no-console
    console.log('Retrieving backlog')
    const backlogResponse = await this.$airtable.get('/Films?view=Backlog')
    const backlogJson = await backlogResponse.json()
    commit('STORE_BACKLOG', backlogJson)
  }
}
