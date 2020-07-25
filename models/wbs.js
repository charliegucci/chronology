const mongoose = require('mongoose');

const wbs = new mongoose.Schema({
  code: {
    type: String
  },
  title: {
    type: String
  },
  level: {
    type: Number
  },
  collapse: {
    type: Boolean
  },
  sub: {
    type: Array
  }
});

module.exports = mongoose.model('Wbs', wbs);
