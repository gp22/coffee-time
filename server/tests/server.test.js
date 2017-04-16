const expect = require('expect');
const request = require('supertest');

/*
Load the necessary models and server.js since the express app
is required for supertest.
*/
const { app } = require('./../server');
const { User } = require('./../models/user');

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
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});