const express = require('express');
const router = express.Router();
const axios = require('axios');
const _ = require('lodash');

const YELP_API_KEY = process.env.YELP_API_KEY;
const yelpUrl = 'https://api.yelp.com/v3/businesses/search?term=coffee&location=';

// QUERY Route
router.get('/api/:city', (req, res) => {
    if (req.params.city === "''") {
        return res.status(411).send();
    }
    const encodedCity = encodeURIComponent(req.params.city);
    const url = yelpUrl + encodedCity;
    const businessList = [];

    axios.get(url, {
        headers: {
            Authorization: 'Bearer ' + YELP_API_KEY
        }
    }).then((response) => {
        response.data.businesses.forEach((element) => {
            const business = _.pick(element, ['name', 'url', 'location.address1']);
            businessList.push(business);
            // console.log(business);
        });
        res.send(businessList);
        // res.send(response.data);
        // res.send();
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;