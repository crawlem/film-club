<template>
  <div class="film">
    <h3>{{ film.fields.Name }}</h3>
  </div>
</template>

<script>
export default {
  name: 'Film',
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

</style>
