var test = require('tape')
var supertest = require('supertest')
var async = require('async')
var net = require('net')

var producer_host = process.env['PRODUCER_HOST']
var producer_port = process.env['PRODUCER_PORT']
var producer = `http://${producer_host}:${producer_port}`

var nginx_host = process.env['NGINX_HOST']
var nginx_port = process.env['NGINX_PORT']
var nginx = `http://${nginx_host}:${nginx_port}`

var config = {
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    max: 10,
    idleTimeoutMillis: 30000,
};

test('Waiting for producer to become available', function (t) {
  var client
  async.retry(function (cb) {
    t.comment(`Attempting to connect to ${producer_host}:${producer_port}...`)
    client = net.connect(producer_port, producer_host, cb)
  }, function (e) {
    t.error(e, 'producer is available')
    if(e) throw e
    client.unref()
    client.end()
    t.end()
  })
})

test('Waiting for nginx to become available', function (t) {
  var client
  async.retry(function (cb) {
    t.comment(`Attempting to connect to ${nginx_host}:${nginx_port}...`)
    client = net.connect(nginx_port, nginx_host, cb)
  }, function (e) {
    t.error(e, 'nginx is available')
    if(e) throw e
    client.unref()
    client.end()
    t.end()
  })
})

function helloWorldTestBuilder (url) {
  return function helloWorldTest (t) {
    supertest(url)
      .get('/')
      .expect(200, 'Hello World!')
      .end(function(e) {
        t.error(e, 'supertest assertions pass')
        t.end()
      })
  }
}

test('Test producer', helloWorldTestBuilder(producer))
test('Test nginx fresh', helloWorldTestBuilder(nginx))
test('Test nginx cache', helloWorldTestBuilder(nginx))
