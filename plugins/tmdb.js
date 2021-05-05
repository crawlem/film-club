export default function ({ $http, $config }, inject) {
  // Setup the HTTP object
  const $tmdb = $http.create({})
  $tmdb.setBaseURL($config.TMDB_BASE_URL)
  $tmdb.setHeader('Content-Type', 'application/json;charset=utf-8')

  // Set our auth header on each request (not globally as it interferes with other HTTP plugins)
  $tmdb.onRequest((config) => {
    // eslint-disable-next-line no-console
    console.log('TMDB: ' + config.url)
    config.headers.set('Authorization', `Bearer ${$config.TMDB_API_KEY_V4}`)
  })

  // Log errors
  $tmdb.onError((error) => {
    // if (error.statusCode === 500) {
    //   alert('Request Error!')
    // }
    // Tip: error.response will be undefined if the connection dropped to the server
    // Tip: You can use error.response.data to get response message
    // Tip: You can return an object or Promise as fallback response to avoid rejection

    if (error.response) {
      // eslint-disable-next-line no-console
      console.error('TMDB ERROR: ' + JSON.stringify(error.response.data))
    }
  })

  // Inject to the context
  inject('tmdb', $tmdb)
}
