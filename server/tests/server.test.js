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
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(res.body._id).then((user) => {
          expect(user.email).toEqual(email);
          // Verify that the password was hashed
          expect(user.password).toNotBe(password);
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
      .end((err) => {
        if (err) {
          return done(err);
        }

        /*
        There should only be 3 users in the collection since
        that's all we added before the invalid request
        */
        User.find().then((users) => {
          expect(users.length).toBe(3);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create a user if the email is in use', (done) => {
    // Supply an email that's already taken and expect a 400
    const email = 'user2@example.com';
    const password = '123abc!';

    request(app)
      .post('/users')
      .send({ email, password })
      .expect(400)
      .end(done);
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
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.going.length).toBe(1);
        expect(res.body.going).toContain(userOneId);
      })
      .end((err) => {
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
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.going.length).toBe(2);
        expect(res.body.going).toContain(userTwoId);
      })
      .end((err) => {
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
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.going.length).toBe(1);
        expect(res.body.going).toNotContain(userOneId);
      })
      .end((err) => {
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
      .set('x-auth', users[0].tokens[0].token)
      .expect(400)
      .expect((res) => {
        expect(res.body.going).toNotExist();
      })
      .end(done);
  });

  /*
  make sure we get a 401 if not authenticated and that
  the response body is empty
  */
  it('should return 401 if not authenticated', (done) => {
    request(app)
      .post(`/${eventId}/${userOneId}`)
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

/*
Verify that users can login, and that invalid logins are handled
*/
describe('POST /login', () => {
  it('should login user and return auth token', (done) => {
    request(app)
      .post('/login')
      .send({
        email: users[0].email,
        password: users[0].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[0]._id).then((user) => {
          expect(user.tokens[1]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((e) => done(e));
      });
  });

  it('should reject invalid login', (done) => {
    request(app)
      .post('/login')
      .send({
        email: users[0].email,
        password: 'asdf'
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});