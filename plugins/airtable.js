export default function ({ $http, $config }, inject) {
  // Setup the HTTP object
  const $airtable = $http.create({})
  $airtable.setBaseURL($config.AIRT_BASE_URL + $config.AIRT_API_BASE_ID)
  $airtable.setToken($config.AIRT_API_KEY, 'Bearer')

  // Some debug
  $airtable.onRequest((config) => {
    // eslint-disable-next-line no-console
    console.log('AIRTABLE: ' + config.url)
  })

  $airtable.onError((error) => {
    // if (error.statusCode === 500) {
    //   alert('Request Error!')
    // }
    // Tip: error.response will be undefined if the connection dropped to the server
    // Tip: You can use error.response.data to get response message
    // Tip: You can return an object or Promise as fallback response to avoid rejection

    if (error.response) {
      // eslint-disable-next-line no-console
      console.log('AIRTABLE ERROR: ' + JSON.stringify(error.response.data))
    }
  })

  // Inject to the context
  inject('airtable', $airtable)
}
