const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

usersSchema.index({ location: '2dsphere' });
usersSchema.index({ 'shop.location': '2dsphere' });

module.exports = mongoose.model('Register', usersSchema);
