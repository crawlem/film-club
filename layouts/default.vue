<template>
  <div>
    <SiteHeader />
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import SiteHeader from '~/components/SiteHeader.vue'
export default {
  components: {
    SiteHeader
  }
}
</script>
