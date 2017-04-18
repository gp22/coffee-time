const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

/*
Load the necessary models and server.js since the express app
is required for supertest.
*/
const { app } = require('./../server');
const { User } = require('./../models/user');
const { Event } = require('./../models/event');
const { users, populateUsers, clearEvents } = require('./seed/seed');

before(populateUsers);
before(clearEvents);

/*
Verify that we get a homepage
*/
describe('GET /', () => {
  it('should return a 200 for the index route', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});

/*
Verify that we can signup a user
*/
describe('POST /users', () => {
  it('should create a new user', (done) => {
    const email = 'user2@example.com';
    const password = 'password';

    request(app)
      .post('/users')
      .send({ email, password })
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(res.body._id).then((user) => {
          expect(user.email).toEqual(email);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create a new user with invalid info', (done) => {
    const email = 'user2example';
    const password = 'p';

    request(app)
      .post('/users')
      .send({ email, password })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        // there should only be 3 users in the collection since
        // that's all we added before the invalid request
        User.find().then((users) => {
          expect(users.length).toBe(3);
          done();
        }).catch((e) => done(e));
      });
  });

});

/*
Verify that we can query the app, and that we get a properly
formatted JSON response
*/
describe('GET /api/:city', () => {
  it('should return formatted JSON for the city we query', (done) => {
    let city = 'New York';

    request(app)
      .get(`/api/${city}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.businesses[0]).toNotBe({});
        expect(res.body.businesses[0].name).toExist();
      })
      .end(done);
  });
});

/*
Verify that we can add and remove a user from an event
*/
describe('POST /:eventId/:userId', () => {
  const userOneId = users[0]._id.toHexString();
  const userTwoId = users[1]._id.toHexString();
  const eventId = 'starbucks';

  it('should create new event and add a user to it', (done) => {
    request(app)
      .post(`/${eventId}/${userOneId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.going.length).toBe(1);
        expect(res.body.going).toContain(userOneId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Event.findOne({ venue: eventId }).then((event) => {
         expect(event.going.length).toBe(1);
         done();
        }).catch((e) => done(e));
      });
  });

  it('should add a user to an existing event', (done) => {
    request(app)
      .post(`/${eventId}/${userTwoId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.going.length).toBe(2);
        expect(res.body.going).toContain(userTwoId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Event.findOne({ venue: eventId }).then((event) => {
         expect(event.going.length).toBe(2);
         done();
        }).catch((e) => done(e));
      });
  });

  it('should remove a user from an existing event', (done) => {
    request(app)
      .post(`/${eventId}/${userOneId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.going.length).toBe(1);
        expect(res.body.going).toNotContain(userOneId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Event.findOne({ venue: eventId }).then((event) => {
         expect(event.going.length).toBe(1);
         done();
        }).catch((e) => done(e));
      });
  });

  // it('should not remove another user from an event', (done) => {

  // });

  // it('should return 404 for non-object event ids', (done) => {

  // });

  it('should return 400 for non-object user ids', (done) => {
    request(app)
      .post(`/${eventId}/asdf`)
      .expect(400)
      .expect((res) => {
        expect(res.body.going).toNotExist();
      })
      .end(done);
  });

});