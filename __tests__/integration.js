const app = require('../app/app');
const request = require('supertest');

describe('GET /feeds', () => {
  test('Get a list of feeds', async () => {
    let response = await request(app).get('/feeds');
    expect(response.body).toEqual({});
  });
});
