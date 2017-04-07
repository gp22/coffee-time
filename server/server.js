require('./config/config');

const express = require('express');

const { mongoose } = require('./db/mongoose');

const app = express();
const PORT = process.env.PORT;

// Import routes
const index = require('./routes/index');

// Setup express to use routes
app.use(index);


// Start the server and listen on PORT.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});