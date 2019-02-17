const app = require('../../app/app')
const request = require('supertest')

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

describe('Error routes', function() {
  describe('GET /users', function() {
    test('respond with wrong url', async () => {
      const response = await request(app)
        .get('/feeds', {json: true})
        .set('Accept', 'application/json')
      expect(response.status).toBe(404)
      expect(response.body.error.title).toEqual('Resource Not Found')
    })
  })
})

describe('GET /feeds/id', () => {
  const postId = '7d78ff348647b782cb3027d836d23e09'
  test('get a list of feeds', async () => {
    await timeout(1000) // wait a second for the handler to load a file
    const response = await request(app).get('/feeds/' + postId)
    expect(response.status).toEqual(200)
    expect(response.body).not.toEqual({})
  })
})
