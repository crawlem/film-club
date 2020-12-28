<template>
  <div class="container">
    <h2>Backlog</h2>
    <Film v-for="film in records" :key="film.ID" :film="film" />
  </div>
</template>

<script>
import Film from '~/components/film.vue'
export default {
  name: 'Backlog',
  components: {
    Film
  },
  data () {
    return {
      records: [
        {
          id: 'recV7nECvw2qwZT8M',
          fields: {
            Poster: [
              {
                id: 'attSZPi89PU7n9mGy',
                url: 'https://dl.airtable.com/.attachments/ee5cf47ca4de461a301c848221060849/39c3920f/2020-12-2720.12.37.jpg',
                filename: '2020-12-27 20.12.37.jpg',
                size: 34039,
                type: 'image/jpeg',
                thumbnails: {
                  small: {
                    url: 'https://dl.airtable.com/.attachmentThumbnails/df568f472ba59151dbee8e16dbbafa24/008981cc',
                    width: 24,
                    height: 36
                  },
                  large: {
                    url: 'https://dl.airtable.com/.attachmentThumbnails/869b5d889189a52899f829a2c8ad84cd/5aed0741',
                    width: 178,
                    height: 264
                  },
                  full: {
                    url: 'https://dl.airtable.com/.attachmentThumbnails/9f65f4b6bd3e4f14e6424ff629c12f56/e822e109',
                    width: 3000,
                    height: 3000
                  }
                }
              }
            ],
            'IMDB link': 'https://m.imdb.com/title/tt2948372/?ref_=nv_sr_srsg_0',
            Name: 'Soul (2020)',
            'Suggested by': [
              'rec3JjgNQXv8GnAkG'
            ],
            Description: 'A musician who has lost his passion for music is transported out of his body and must find his way back with the help of an infant soul learning about...',
            ID: 1,
            Status: 'Watched',
            'Watch date': '2020-12-27',
            Meetings: [
              'recKlZo81XNgk3g7i'
            ],
            Genre: [
              'Animation'
            ],
            'JustWatch link': 'https://justwatch.com/uk/movie/soul'
          },
          createdTime: '2020-12-27T19:09:41.000Z'
        },
        {
          id: 'recwrEQuLrOMHu5OP',
          fields: {
            Poster: [
              {
                id: 'att2LV4BDDdQ37Ob1',
                url: 'https://dl.airtable.com/.attachments/901b519ce5e8d7d5998c76e97d24b4a6/74b782f6/2020-12-2720.16.47.jpg',
                filename: '2020-12-27 20.16.47.jpg',
                size: 32757,
                type: 'image/jpeg',
                thumbnails: {
                  small: {
                    url: 'https://dl.airtable.com/.attachmentThumbnails/2ae03f218b611b27b57743c868f332aa/9d1255d1',
                    width: 24,
                    height: 36
                  },
                  large: {
                    url: 'https://dl.airtable.com/.attachmentThumbnails/6198af2b10890651b200b8dda4487484/6ef5ae42',
                    width: 178,
                    height: 264
                  },
                  full: {
                    url: 'https://dl.airtable.com/.attachmentThumbnails/72b686ab237da96ca445576a57e04a82/e60e6718',
                    width: 3000,
                    height: 3000
                  }
                }
              }
            ],
            'IMDB link': 'https://m.imdb.com/title/tt0118971/?ref_=nv_sr_srsg_0',
            Name: 'The Devil’s Advocate (1997)',
            'Suggested by': [
              'recFzkPqu3AvM2HN4'
            ],
            Description: 'An exceptionally adept Florida lawyer is offered a job at a high-end New York City law firm with a high-end boss - the biggest opportunity of his care...',
            ID: 2,
            Status: 'Added',
            Genre: [
              'Thriller'
            ],
            'JustWatch link': 'https://justwatch.com/uk/movie/the-devils-advocate'
          },
          createdTime: '2020-12-27T19:26:40.000Z'
        }
      ],
      offset: 'rec3m5OwzapsCxpZv'
    }
  }
}
</script>

<style scoped>
</style>
