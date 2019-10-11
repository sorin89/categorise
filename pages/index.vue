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
            <b-button class="button is-large is-primary" @click="getCategories">Categorise</b-button>
          </p>
        </b-field>
        <div v-if="categories">
          Results here:
          <div class="card" v-for="result in categories" :key="result.score">
            <div class="card-content">
              {{result.label}}
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
  async asyncData({store, query}) {
    console.log('asyncdata')
    store.commit('categories/emptyList')
    if(query.url) {
      const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
      const { IamAuthenticator } = require('ibm-watson/auth');
      const nlu = new NaturalLanguageUnderstandingV1({
        authenticator: new IamAuthenticator({ apikey: process.env.apiKey }),
        version: '2019-07-12',
        url: 'https://gateway-lon.watsonplatform.net/natural-language-understanding/api'
      });
      await nlu.analyze(
        {
          url: query.url,
          features: {
            categories: {}
          }
        })
        .then(response => {
          store.commit('categories/add', response.result.categories)
        })
        .catch(err => {
          console.log('error: ', err);
        });
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
</style>