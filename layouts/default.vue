<template>
  <div>
    <header>
      <SiteNav />
    </header>
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import SiteNav from '~/components/SiteNav.vue'
export default {
  components: {
    SiteNav
  }
}
</script>
