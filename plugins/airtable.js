export default function ({ $http, $config }, inject) {
  // Setup the HTTP object
  const $airtable = $http.create({})
  $airtable.setBaseURL($config.baseUrl + $config.baseId)
  $airtable.setToken($config.apiKey, 'Bearer')

  // Inject to the context as $airtable
  inject('airtable', $airtable)

  // Some debug
  $airtable.onRequest((config) => {
    // eslint-disable-next-line no-console
    console.log('Making request to ' + config.url)
  })
}
