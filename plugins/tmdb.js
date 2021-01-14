export default function ({ $http, $config }, inject) {
  // Setup the HTTP object
  const $tmdb = $http.create({})
  $tmdb.setBaseURL($config.TMDB_BASE_URL)
  $tmdb.setToken($config.TMDB_API_KEY, 'Bearer')

  // Inject to the context as $tmdb
  inject('tmdb', $tmdb)

  // Some debug
  $tmdb.onRequest((config) => {
    // eslint-disable-next-line no-console
    console.log('Making request to ' + config.url)
  })
}
