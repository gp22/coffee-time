require('./config/config');

const express = require('express');

const { mongoose } = require('./db/mongoose');

const app = express();
const PORT = process.env.PORT;

// Import routes
const index = require('./routes/index');
const query = require('./routes/query');
const signup = require('./routes/signup');
const event = require('./routes/event');

// Setup express to use routes
app.use(index);
app.use(query);
app.use(signup);
app.use(event);

// Start the server and listen on PORT.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});

// Export express so that it can be used by mocha for tests
module.exports = { app };