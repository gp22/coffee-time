const express = require('express');
const path = require('path');

const router = express.Router();

// DEFAULT route to catch all other requests.
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

module.exports = router;
