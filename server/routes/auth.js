const express = require('express');
const router = express.Router();

// const mongoose = require('mongoose');
const { User } = require('./../models/user');

const bodyParser = require('body-parser');
const _ = require('lodash');

router.use(bodyParser.json());

// SIGNUP route
router.post('/users', (req, res) => {
  const userData = _.pick(req.body, ['email', 'password']);
  const user = new User(userData);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// LOGIN route
router.post('/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

module.exports = router;