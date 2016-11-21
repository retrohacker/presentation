var supertest = require('supertest')
var app = require('../')
var tape = require('tape')

tape('Server returns hello world', function (t) {
  supertest(app)
    .get('/')
    .expect(200, 'Hello World!')
    .end(function (e) {
      t.error(e, 'Supertest checks pass')
      t.end()
    })
})
