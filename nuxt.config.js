require('dotenv').config();

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Osterlies Film Club',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'robots', content: 'noindex' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fira+Sans:wght@200;300;400&display=swap' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/css/main.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/tmdb',
    '~/plugins/airtable'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxt/http'
  ],

  publicRuntimeConfig: {
    AIRT_BASE_URL: process.env.AIRT_BASE_URL || 'https://api.airtable.com/v0/',
    AIRT_API_KEY: process.env.AIRT_API_KEY,
    AIRT_API_BASE_ID: process.env.AIRT_API_BASE_ID,
    TMDB_BASE_URL: process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3/',
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    TMDB_IMG_PATH_1X: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2',
    TMDB_IMG_PATH_2X: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2',
    TMDB_IMG_PATH_1X_FACE: 'https://www.themoviedb.org/t/p/w138_and_h175_face',
    TMDB_IMG_PATH_2X_FACE: 'https://www.themoviedb.org/t/p/w276_and_h350_face'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true
  }
}
