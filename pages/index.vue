<template>
  <section class="section">
    <div class="columns is-mobile">
      <div class="column">
        <b-icon v-if="!url" icon="link" />
        <img v-else :src="'https://res.cloudinary.com/skim/image/upload/h_32,w_32,d_default_link.png/monolink/favicons/'+url" alt="Site logo">
        <b-input class="is-fullwidth" v-model="url" size="is-medium"></b-input>

        <div v-if="url">
          Results here
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'HomePage',
  components: {
    Card
  },
  data() {
    return {
      url: "",
      showResults: false,
    }
  },
}
</script>
