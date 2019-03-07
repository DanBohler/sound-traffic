const express       = require ('express');
const advertRoutes = express.Router ();
const Article       = require('../models/Article');
// include CLOUDINARY:
const uploader      = require('../config/cloudinary')


advertRoutes.post('/updatephoto', (req, res, next) => {
  User.findOneAndUpdate({username: req.body.username},{imageUrl: req.body.imageUrl},{new: true})
  .then((user) => {
    res.json({user})
  })
  .catch(err => {
    console.log(err)
  })
})

advertRoutes.post('/createad', uploader.single("imageUrl"), (req, res, next) => {

  console.log("que es estoooooo",req.body.advert)
  const {username, email, product, price, description, imageUrl } = req.body.advert

  if (!product || !price || !description) {
    res.status (400).json ({message: 'Provide product, price, status and description'})
    return;
  }

  const aNewAdvert = new Article({
    username: username,
    email: email,
    product: product,
    price: price,
    description: description,
    imageUrl: imageUrl,
  })
  
  aNewAdvert.save()
  .then(newAdvert=>{
    console.log("newwwwwwwww",newAdvert)
    res.status(200).json(newAdvert)
  })
  .catch(err=>console.log(err))
})

module.exports = advertRoutes;