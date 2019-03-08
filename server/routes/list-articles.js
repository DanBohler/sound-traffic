const express = require ('express');
const Articles = require ('../models/Article')
const listArticles = express.Router();

listArticles.get('/articles', (req, res, next) => {
  Articles.find()
  .then((articles) => {
    return res.json(articles)
  })
  
})

listArticles.post('/oneAdInfo', (req, res, next) => {
  Articles.findById(req.body.id_article)
  .then((id_article) => {
    return res.json(id_article)
  })
})

listArticles.post('/myads', (req, res, next) => {

  console.log(req.body.article)
  const usuario = req.body.article
  console.log(usuario)
  Articles.find({username:usuario})
  .then((data)=>{
    console.log(data)
    res.json({data})
  })
  .catch((err)=>console.log(err))
  

})

module.exports = listArticles;