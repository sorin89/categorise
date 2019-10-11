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
  //call IBM NLU api
  nlu.analyze(
    {
      url: req.query.url,
      features: {
        categories: {}
      }
    })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json({error: err});
    });
})

module.exports = {
  path: '/api',
  handler: app
}