<template>
  <section class="section">
    <div class="columns is-mobile">
      <div class="column">
        <b-field >
          <p class="control">
            <button class="button is-large favicon" disabled>
              <img v-if="!url" src="/url.png" />
              <img v-else :src="'https://res.cloudinary.com/skim/image/upload/h_32,w_32,d_default_link.png/monolink/favicons/'+domain" alt="Site logo">
            </button>
          </p>
          <b-input expanded class="is-fullwidth" v-model="url" type="url" placeholder="https://" size="is-large"></b-input>
          <p class="control">
            <nuxt-link class="button is-large is-primary" :to="'/?url='+url">Categorise</nuxt-link>
          </p>
        </b-field>
        <div v-if="categories">
          <div class="card" v-for="result in categories" :key="result.score">
            <div class="card-content">
              <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
                <ul>
                  <li v-for="sub in result.label.split('/')" :key="sub" >
                    <p v-if="sub.length">{{sub.toUpperCase()}}</p>
                  </li>
                </ul>
              </nav>
              <b-progress :value="result.score*100" show-value format="percent"></b-progress>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card'
import axios from 'axios'
import parseDomain from "parse-domain"

export default {
  name: 'HomePage',
  components: {
    Card
  },
  watchQuery: ['url'],
  data() {
    return {
      url: this.$route.query.url,
      showResults: false,
      results: null
    }
  },
  computed: {
    domain() {
      if(parseDomain(this.url)) {
        return parseDomain(this.url).domain+'.'+parseDomain(this.url).tld
      }
    },
    categories() {
      if(this.$store.getters['categories/list'].length) {
        return this.$store.getters['categories/list']
      }
      else {
        return null
      }
    },
  },
  methods: {
    async getCategories() {
      
    }
  },
  async fetch({store, query}) {
    store.commit('categories/emptyList')
    if(query.url) {
      await axios.get('http://localhost:3000/api/categories', {params: {url: query.url}})
        .then(function (res) {
          store.commit('categories/add', res.data.result.categories)
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }
}
</script>
<style>
.button[disabled] {
  opacity: unset;
}
.favicon img {
  border-radius: 3px;
}
li {
  font-weight: 700;
}
li p {
  padding: 0 0.65rem;
}
</style>