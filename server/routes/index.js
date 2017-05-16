const express = require('express');
const path = require('path');

const router = express.Router();
const app = express();

// Create link to Angular build directory
const distDir = path.join(__dirname, '../dist');
app.use(express.static(distDir));

// HOME route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

module.exports = router;
