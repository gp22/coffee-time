const { User } = require('./../models/user');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      /*
      This will stop the rest of the function from running and
      run the code in the catch statement
      */
      return Promise.reject();
    }
    
    /*
    Set the found user and token on the request object so they're
    available to the rest of the function after next() is called
    */
    req.user = user;
    req.token = token;
    next();
    // res.send(user);
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = { authenticate };