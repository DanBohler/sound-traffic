const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const equipSchema = new Schema({
  name: String,
  status: String,
  imageUrl: {type: String, required: false}
});

const Equipment = mongoose.model('Equipment', equipSchema);
module.exports = Equipment;