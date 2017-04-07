/*
This file sets up some defaults for the environment depending on whether
the app is running locally or on Heroku. If it's running on Heroku then the
environment variable process.env.NODE_ENV will exist and the port and
MONGODB_URI will be set. Otherwise, if it's running locally we set the
port and MONGODB_URI depending on if we're testing or not.
*/

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/CoffeeTime';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/CoffeeTimeTest'; 
}