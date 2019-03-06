const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const articleSchema = new Schema({
  user: String,
  product: String,
  price: Number,
  description: String,
  coordinates: {lat: Number, lng: Number},
  imageUrl: { type: String },
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;