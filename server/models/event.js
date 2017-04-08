const mongoose = require('mongoose');

const Event = mongoose.model('Event', {
  venue: {
    type: String,
    required: true,
    unique: true
  },
  going: [{
    type: String,
    unique: true
  }]
});

module.exports = { Event };