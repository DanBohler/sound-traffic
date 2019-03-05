const express = require ('express');
const passport = require ('passport');
const Articles = require ('../models/Article')
const listArticles = express.Router();
const Article = express.Router();

listArticles.get('/articles', (req, res, next) => {
  Articles.find().then((articles) => {
    return res.json(articles)
  })
  
})

module.exports = listArticles;