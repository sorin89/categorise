<template>
  <div>
    <nav
      class="navbar header has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
        <img src="logo.svg" alt="" class="logo">
          CATEGORISE
        </nuxt-link>
      </div>
    </nav>

    <section class="main-content columns">

      <div class="container column is-8-tablet is-6-desktop">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  }
}
</script>
<style>
  .navbar-brand {
    width: 100%;
  }
  .navbar-item {
    margin: 0 auto;
    font-size: 1.5rem;
    font-weight: 700;
  }
  .logo {
    margin: 1rem;
  }
</style>
