export default ({ $axios, env }) => {
  $axios.onRequest((config) => {
    config.headers.common.Authorization = `Bearer ${env.API_KEY}`
  })
}
