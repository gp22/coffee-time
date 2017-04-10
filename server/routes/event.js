const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const { Event } = require('./../models/event');

const bodyParser = require('body-parser');
const _ = require('lodash');

router.use(bodyParser.json());

// SIGNUP route
router.post('/event/:userId', (req, res) => {
  // get eventId and userId from query
  const eventData = _.pick(req.body, ['venue']);
  eventData.going = req.params.userId;

  // query db to see if there is already an event with the same eventId
  Event.findOne({ venue: eventData.venue }).then((event) => {
    // if there isn't:
    if (!event) {
      // create the new event
      const event = new Event(eventData);
      event.save().then(() => {
        return res.send({ event });
      });
    }

    // if there is:
    // check to see if the user is already going:
    // if they are: remove them
    // if they aren't: add them    
    res.send({ event });
  }).catch((e) => {
    res.status(400).send();
  });
});

module.exports = router;