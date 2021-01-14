export default function ({ $http, $config }, inject) {
  // Setup the HTTP object
  const $airtable = $http.create({})
  $airtable.setBaseURL($config.AIRT_BASE_URL + $config.AIRT_API_BASE_ID)
  $airtable.setToken($config.AIRT_API_KEY, 'Bearer')

  // Inject to the context as $airtable
  inject('airtable', $airtable)

  // Some debug
  $airtable.onRequest((config) => {
    // eslint-disable-next-line no-console
    console.log('Making request to ' + config.url)
  })
}
