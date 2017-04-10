const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
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

const Event = mongoose.model('Event', EventSchema);

module.exports = { Event };