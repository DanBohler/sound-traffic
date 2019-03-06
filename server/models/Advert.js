const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const aadvertSchema = new Schema({
  product: String,
  price: Number,
  status: String,
  description: String,
  imageUrl: { type: String, required: false },
  created: { 
    type: Date,
    default: Date.now
  }
});

const Advert = mongoose.model('Advert', aadvertSchema);
module.exports = Advert;