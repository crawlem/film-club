<template>
  <header>
    <h1>Film Club</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/backlog">Backlog</a></li>
        <li><a href="/suggest">Suggest a film</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style scoped>
header h1 {
  display: none;
}

nav ul {
  padding: 0;
}

nav li {
  display: inline;
  margin: 10px;
}
</style>
