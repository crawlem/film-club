<template>
  <div class="film">
    <h3>{{ film.fields.Name }}</h3>
    <p class="p-poster">
      <img :src="film.fields.Poster[0].thumbnails.large.url" :width="film.fields.Poster[0].thumbnails.large.width" :height="film.fields.Poster[0].thumbnails.large.height" alt="">
    </p>
    <ul class="p-tags">
      <Tag v-for="tag in film.fields.Genre" :key="tag" :tag="tag" />
    </ul>
  </div>
</template>

<script>
import Tag from '~/components/tag.vue'
export default {
  name: 'Film',
  components: {
    Tag
  },
  props: {
    film: {
      type: Object,
      default () {
        return {
          fields: {
            Name: 'Undefined'
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  h3 {
    display: none;
  }

  ul {
    margin: 0;
    padding: 0;
  }
</style>
