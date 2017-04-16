/*
This file sets up defaults for the environment, and variables that depend on
whether the app is running locally or on Heroku.
If it's running on Heroku then the environment variable process.env.NODE_ENV
will exist and PORT and MONGODB_URI will be set automatically by Heroku.
Otherwise, if it's running locally we set PORT and MONGODB_URI depending on
if we're testing or not.
*/
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/CoffeeTime';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/CoffeeTimeTest'; 
}