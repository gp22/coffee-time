const express = require('express');
const router = express.Router();

// HOME route
router.get('/', (req, res) => {
    res.send('coffeeTime!');
});

module.exports = router;