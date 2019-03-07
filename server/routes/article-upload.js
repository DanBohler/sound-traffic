const express       = require ('express');
const advertRoutes = express.Router ();
const Article       = require('../models/Article');
// include CLOUDINARY:
const uploader      = require('../config/cloudinary')

advertRoutes.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ secure_url: req.file.secure_url })
})

advertRoutes.post('/updatephoto', (req, res, next) => {
  User.findOneAndUpdate({username: req.body.username},{imageUrl: req.body.imageUrl},{new: true})
  .then((user) => {
    res.json({user})
  })
  .catch(err => {
    console.log(err)
  })
})

advertRoutes.post('/createad', (req, res, next) => {

  console.log(req.body.advert)
  const {product, price, description, imageUrl} = req.body.advert

  if (!product || !price || !description) {
    res.status (400).json ({message: 'Provide product, price, status and description'})
    return;
  }

  const aNewAdvert = new Article({
    product: product,
    price: price,
    description: description,
    imageUrl: imageUrl
  })
  
  aNewAdvert.save()
  .then(newAdvert=>{
    res.status(200).json(newAdvert)
  })
  .catch(err=>console.log(err))
})

module.exports = advertRoutes;