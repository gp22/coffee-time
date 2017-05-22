const express = require('express');

const router = express.Router();

const { ObjectID } = require('mongodb');
const { Event } = require('./../models/event');
const { authenticate } = require('./../middleware/authenticate');

const bodyParser = require('body-parser');

router.use(bodyParser.json());

// Route to add user to event
router.post('/:eventId/:userId', authenticate, (req, res) => {
  if (!ObjectID.isValid(req.params.userId)) {
    return res.status(400).send();
  }

  const userId = ObjectID.createFromHexString(req.params.userId);
  const eventId = req.params.eventId;

  // Query db to see if there is already an event with the same eventId
  Event.findOne({ venue: eventId }).then((event) => {
    if (!event) {
      // If the event doesn't exist, create it.
      const event = new Event({
        venue: eventId,
        going: userId
      });
      return event.save().then((event) => {
        return res.send(event);
      });
    } else if (event.going.indexOf(req.params.userId) !== -1) {
      /*
      If the event exists, check to see if the user is already going:
      If they are going: remove them.
      */
      const index = event.going.indexOf(userId);
      event.going.splice(index, 1);
      return event.save().then((event) => {
        return res.send(event);
      });
    } else {
      // If they aren't going: add them.
      event.going.push(userId);
      return event.save().then((event) => {
        return res.send(event);
      });
    }
  }).catch(() => {
    res.status(400).send();
  });
});

module.exports = router;
