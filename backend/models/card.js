const mongoose = require('mongoose');
const { regExpURL } = require('../constants/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxLength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    match: [regExpURL, 'Введите корректный URL'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
