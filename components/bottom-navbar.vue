<template>
  <b-nav id="footer" align="center">
    <b-nav-item to="/">Homepage</b-nav-item>
    <b-nav-item to="/privacy/">Privacy</b-nav-item>
  </b-nav>
</template>

<style lang="scss" scoped>
#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  // Change layouts/default.vue #page-container padding when adjusting margin or height
  margin: 0.4rem 0;
  height: 2.5rem;
}
.nuxt-link-exact-active {
  color: black;
}
</style>
