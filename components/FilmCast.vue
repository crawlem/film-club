<template>
  <div class="film-cast">
    <ul class="cast-list">
      <li v-for="person in cast" :key="person.id" class="cast-item">
        <img v-if="person.profile_path" :src="imgSrc(person.profile_path)" alt="">
        <img v-else :src="anonImgSrc(person.gender)" width="138" height="175" alt="">
        <p>
          <strong>{{ person.name }}</strong>
          <br>
          <span class="character-name">{{ person.character }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FilmCast',
  props: {
    cast: {
      type: Array,
      default () {
        return {
          fields: {
            Name: 'Undefined'
          }
        }
      }
    }
  },
  methods: {
    imgSrc (src) {
      return this.$config.TMDB_IMG_PATH_1X_FACE + src
    },
    imgSrcSet (src) {
      return this.imgSrc(src) + ' 1x, ' + this.$config.TMDB_IMG_PATH_2X_FACE + src + ' 2x'
    },
    anonImgSrc (gender) {
      let src = '/images/anon_'
      src += (gender === 2) ? '2' : '1'
      return src + '.svg'
    }
  }
}
</script>
