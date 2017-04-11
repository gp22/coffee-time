const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const { Event } = require('./../models/event');

const bodyParser = require('body-parser');
const _ = require('lodash');

router.use(bodyParser.json());

// Route to add user to event
router.post('/:eventId/:userId', (req, res) => {
  // get eventId and userId from query
  userId = req.params.userId;
  eventId = req.params.eventId;
  // const eventData = _.pick(req.body, ['venue']);
  // eventData.going = userId;

  // query db to see if there is already an event with the same eventId
  Event.findOne({ venue: eventId }).then((event) => {
    // if there isn't:
    if (!event) {
      // create the new event
      const event = new Event({
        venue: eventId,
        going: userId
      });
      event.save().then(() => {
        return res.send({ event });
      });
    }

    // if there is:
    // check to see if the user is already going:
    if (event.going.indexOf(req.params.userId) !== -1) {
      // if they are: remove them
      index = event.going.indexOf(userId);
      event.going.splice(index, 1);
      event.save().then(() => {
        return res.send({ event });
      });
    } else {
      // if they aren't: add them
      event.going.push(userId);
      event.save().then(() => {
        return res.send({ event });
      });
    }
  }).catch((e) => {
    res.status(400).send();
  });
});

module.exports = router;