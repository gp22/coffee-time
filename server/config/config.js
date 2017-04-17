/*
This file sets up defaults for the environment, and variables that depend on
whether the app is running locally or on Heroku.
If it's running on Heroku then the environment variable process.env.NODE_ENV
will exist and PORT and MONGODB_URI will be set automatically by Heroku.
Otherwise, if it's running locally we set PORT and MONGODB_URI depending on
if we're testing or not.
*/
const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  const config = require('./config.json');
  const envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}