const { ObjectID } = require('mongodb');

const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
// Array to use for seed data
const users = [{
  _id: userOneId,
  email: 'user@example.com',
  password: 'userOnePass'
  // tokens: [{
  //   access: 'auth',
  //   token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET).toString()
  // }]
}, {
  _id: userTwoId,
  email: 'amy@example.com',
  password: 'userTwoPass'
  // tokens: [{
  //   access: 'auth',
  //   token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET).toString()
  // }]
}];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    // Add .save() to be sure to run the middleware
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();

    // Use Promise.all() to wait for all of the save calls to complete
    // the callback does not get fired until all of the promises resolve
    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = { users, populateUsers };
