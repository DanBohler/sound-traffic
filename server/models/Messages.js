const mongoose = require('moongose');
const Schema   = mongoos.Schema;

const messageSchema = new Schema({
  user: String,
  messages: String,
  created: { 
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;