const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  imageUrl: { type: String, required: false },
  coordinates: {lat: Number, lng: Number},
  articles: [{type: Schema.Types.ObjectId, ref: 'Article'}]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
