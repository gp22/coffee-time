const express = require('express');
const router = express.Router();

const axios = require('axios');

const mongoose = require('mongoose');
const { Event } = require('./../models/event');

const YELP_API_KEY = process.env.YELP_API_KEY;
const yelpUrl = 'https://api.yelp.com/v3/businesses/search?term=coffee&location=';

// QUERY Route
router.get('/api/:city', (req, res) => {
  if (req.params.city === "''") {
    return res.status(411).send();
  }
  const encodedCity = encodeURIComponent(req.params.city);
  const url = yelpUrl + encodedCity;

  axios.get(url, {
    headers: {
      'Authorization': 'Bearer ' + YELP_API_KEY
    }
  }).then((response) => {
    // The filtered list of businesses to send back to the client
    // after the Yelp query.
    let allPromises = [];
    /*
    Try to solve this problem using Promise.all() from this code:
    https://jsfiddle.net/nurulnabi/1k2zv9cp/2/
    https://www.sitepoint.com/deeper-dive-javascript-promises/
    */
    response.data.businesses.forEach((business) => {
      // Search the db for events with a venue matching the id
      
      allPromises.push(new Promise((resolve) => {
        return Event.findOne({ venue: business.id }).then((event) => {
          let businessToPush = {
            name: business.name,
            url: business.url,
            id: business.id,
            location: business.location.address1
          };
          if (!event) {
            // if no event is found, set the number of people going to 0
            businessToPush.going = 0;
          } else {
            // if there is one, add the number of people going to the business
            businessToPush.going = event.going.length;
          }
          // businessToPush will go into the allPromises array
          resolve(businessToPush);
        });
      }));
    });
    // don't send the business list until all promises from forEach() 
    // have resolved
    Promise.all(allPromises).then(() => {
      let businessList = [];
      allPromises.forEach((business) => {
        businessList.push(business);
      })      
      console.log(allPromises);
      res.send({ businessList });
    });
  }).catch((e) => {
    res.status(400).send(e);
  });
});

module.exports = router;