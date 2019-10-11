const express = require('express');
const app = express();
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const nlu = new NaturalLanguageUnderstandingV1({
  authenticator: new IamAuthenticator({ apikey: process.env.API_KEY }),
  version: '2019-07-12',
  url: 'https://gateway-lon.watsonplatform.net/natural-language-understanding/api'
});

app.get('/categories', (req, res) => {
  nlu.analyze(
    {
      url: req.query.url,
      features: {
        categories: {}
      }
    })
    .then(response => {
      res.json(response);
      //store.commit('categories/add', response.result.categories)
    })
    .catch(err => {
      res.json({error: err});
      console.log('error: ', err);
    });
})

module.exports = {
  path: '/api',
  handler: app
}