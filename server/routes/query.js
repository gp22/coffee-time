const express = require('express');
const router = express.Router();

const validator = require('validator');
const axios = require('axios');

const mongoose = require('mongoose');
const { Event } = require('./../models/event');

const YELP_API_KEY = process.env.YELP_API_KEY;
const yelpUrl = 'https://api.yelp.com/v3/businesses/search?term=coffee&location=';
const whiteList = 'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// QUERY Route
router.get('/api/:city', (req, res) => {
  if (!validator.isWhitelisted(req.params.city, whiteList)) {
    return res.status(400).send();
  }
  const encodedCity = encodeURIComponent(req.params.city);
  const url = yelpUrl + encodedCity;

  axios.get(url, {
    headers: {
      'Authorization': 'Bearer ' + YELP_API_KEY
    }
  }).then((response) => {
    // The array of promises that will be created in the forEach() loop
    let allPromises = [];
    
    /*
    Solved this using Promise.all() with help from these links:
    https://jsfiddle.net/nurulnabi/1k2zv9cp/2/
    https://www.sitepoint.com/deeper-dive-javascript-promises/
    */
    response.data.businesses.forEach((business) => {
      /*
      For each business returned from the Yelp query:
      Query the db for events with a venue matching business.id. Wrap
      each query in a promise and add it to allPromises so we can wait
      until every query is finished before sending a response to the client.
      */
      allPromises.push(new Promise((resolve) => {
        return Event.findOne({ venue: business.id }).then((event) => {
          let businessToPush = {
            name: business.name,
            url: business.url,
            id: business.id,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state
          };
          if (!event) {
            // If no event is found, set the number of people going to 0
            businessToPush.going = 0;
          } else {
            // If an event is found, add the number of people going to the business
            businessToPush.going = event.going.length;
          }
          // businessToPush will go into the allPromises array
          resolve(businessToPush);
        });
      }));
    });

    /*
    Don't send the business list back to the client until all promises from
    response.data.businesses.forEach() have resolved
    */
    Promise.all(allPromises).then((result) => {
      let businesses = result;
      res.send({ businesses });
    });
    
  }).catch((e) => {
    res.status(400).send(e);
  });
});

module.exports = router;