<template>
  <header class="site-header">
    <section>
      <NuxtLink to="/" class="site-logo-link">
        <h1 class="site-logo">
          <img src="/images/logo.svg" width="24" height="24">
          Osterlies Film Club
        </h1>
      </NuxtLink>
      <!-- <nav class="main-nav">
        <ul>
          <NuxtLink to="/">
            Next meeting
          </NuxtLink>
          <NuxtLink to="/backlog">
            Backlog
          </NuxtLink>
          <NuxtLink to="/suggest">
            Suggest a film
          </NuxtLink>
        </ul>
      </nav> -->
    </section>
  </header>
</template>

<script>
export default {
  name: 'SiteHeader'
}
</script>

<style>
</style>
