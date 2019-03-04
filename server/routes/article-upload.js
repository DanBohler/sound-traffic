const express       = require ('express');
const passport      = require ('passport');
const articleRoutes = express.Router ();
const Article       = require('../models/Article');
const uploader      = require('../config/cloudinary')

articleRoutes.post('/createad', (req, res, next) => {
  const {product, price, description, imageUrl} = req.body.profile

  if (!product || !price || !description) {
    res.status (400).json ({message: 'Provide product, price and description'})
    return;
  }

  const aNewArticle = new Article({
    product: product,
    price: price,
    description: description
  })

  aNewArticle.save(article => {
    
    if (err) {
      res
        .status (400)
        .json ({message: 'Saving user to database went wrong.'});
      return;
    }
    res.status (200).json (article);
  })
})

module.exports = articleRoutes;