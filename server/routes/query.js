const express = require('express');
const router = express.Router();
const axios = require('axios');
const Event = require('./models/event');
// const _ = require('lodash');

const YELP_API_KEY = process.env.YELP_API_KEY;
const yelpUrl = 'https://api.yelp.com/v3/businesses/search?term=coffee&location=';

// QUERY Route
router.get('/api/:city', (req, res) => {
    if (req.params.city === "''") {
        return res.status(411).send();
    }
    const encodedCity = encodeURIComponent(req.params.city);
    const url = yelpUrl + encodedCity;
    // The filtered list of businesses to send back to the client
    // after the Yelp query.
    const businessList = [];

    axios.get(url, {
        headers: {
            Authorization: 'Bearer ' + YELP_API_KEY
        }
    }).then((response) => {
        response.data.businesses.forEach((business) => {
            // Search the db for events with a venue matching the id
            let businessToPush = {};
            businessToPush.name = business.name;
            businessToPush.url = business.url;
            businessToPush.id = business.id;
            businessToPush.location = business.location.address1;
            businessList.push(businessToPush);
        });
        res.send(businessList);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;