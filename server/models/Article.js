const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const articleSchema = new Schema({
  user: String,
  product: String,
  price: Number,
  description: String,
  imageUrl: { type: String, required: false },
  // created: { 
  //   type: Date,
  //   default: Date.now
  // }
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;