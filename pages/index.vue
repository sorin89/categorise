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
            <nuxt-link class="button is-large is-dark" :to="'/?url='+url">
              Go &raquo;
            </nuxt-link>
          </p>
        </b-field>
        <b-message v-if="error" type="is-danger" has-icon>
          {{error}}
        </b-message>
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
              <b-progress :value="result.score*100" show-value format="percent" size="is-medium" type="is-success"></b-progress>
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
      url: this.$route.query.url
    }
  },
  computed: {
    //get domain from URL, using domain to get logo
    domain() {
      if(parseDomain(this.url)) {
        return parseDomain(this.url).domain+'.'+parseDomain(this.url).tld
      }
    },
    //get categories from store
    categories() {
      if(this.$store.getters['categories/list'].length) {
        return this.$store.getters['categories/list']
      }
      else {
        return null
      }
    },
    //display error
    error() {
      if(this.$store.getters['categories/error']) {
        return this.$store.getters['categories/error']
      }
    }
  },
  methods: {
    async getCategories() {
      
    }
  },
  async fetch({store, query}) {
    store.commit('categories/emptyList')
    store.commit('categories/emptyError')
    //if the url param is present, call the api to get categories
    if(query.url) {
      await axios.get((process.env.API_URL || process.env.apiUrl)+'/api/categories', {params: {url: query.url}})
        .then(function (res) {
          //if error, save error to store
          if(res.data.error) {
            store.commit('categories/addError', res.data.error.message)
          }
          //else get categories and save them to store
          else {
            store.commit('categories/add', res.data.result.categories)
          }
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
.favicon {
  padding: 0!important;
  min-width:50px;
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