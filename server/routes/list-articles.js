const express = require ('express');
const Articles = require ('../models/Article')
const listArticles = express.Router();

listArticles.get('/articles', (req, res, next) => {
  Articles.find().then((articles) => {
    return res.json(articles)
  })
  
})

listArticles.post('/oneAdInfo', (req, res, next) => {
  Articles.findById(req.body.id_article)
  .then((id_article) => {
    console.log(id_article)
    return res.json(id_article)
  })
})

module.exports = listArticles;