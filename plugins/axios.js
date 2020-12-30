export default ({ $axios, $config: { apiKey } }) => {
  $axios.onRequest((config) => {
    config.headers.common.Authorization = `Bearer ${apiKey}`
  })
}
