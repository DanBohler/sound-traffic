const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  imageUrl: { type: String, required: false }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
