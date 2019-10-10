<template>
  <section class="section">
    <div class="columns is-mobile">
      <div class="column">
        <b-field >
          <p class="control">
            <button class="button is-medium" disabled>
              <b-icon v-if="!url" icon="link" />
              <img v-else :src="'https://res.cloudinary.com/skim/image/upload/h_32,w_32,d_default_link.png/monolink/favicons/'+url" alt="Site logo">
            </button>
          </p>
          <b-input expanded class="is-fullwidth" v-model="url" size="is-medium"></b-input>
          <p class="control">
            <b-button class="button is-medium is-primary" @click="getCategories">Search</b-button>
          </p>
        </b-field>

        <div v-if="showResults">
          Results here:
          <div class="card" v-for="result in results" :key="result.score">
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

export default {
  name: 'HomePage',
  components: {
    Card
  },
  data() {
    return {
      url: "",
      showResults: false,
      results: null
    }
  },
  methods: {
    async getCategories({$axios}) {
      this.showResults = true;
      this.results = [
        {
          "score": 0.946293,
          "label": "/health and fitness"
        },
        {
          "score": 0.935482,
          "label": "/health and fitness/therapy"
        },
        {
          "score": 0.885707,
          "label": "/health and fitness/disease/cancer/brain tumor"
        }
      ];
    }
  }
}
</script>
