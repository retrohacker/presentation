var test = require('tape')
var supertest = require('supertest')
var async = require('async')
var net = require('net')

var server_host = process.env['PRODUCER_HOST']
var server_port = process.env['PRODUCER_PORT']

test('Waiting for service to become available', function (t) {
  var client
  async.retry(function (cb) {
    t.comment(`Attempting to connect to ${server_host}:${server_port}...`)
    client = net.connect(server_port, server_host, cb)
  }, function (e) {
    t.error(e, 'server is available')
    if(e) throw e
    client.unref()
    client.end()
    t.end()
  })
})

function helloWorldTest (t) {
  supertest(`http://${server_host}:${server_port}`)
    .get('/')
    .expect(200, 'Hello World!')
    .end(function(e) {
      t.error(e, 'supertest assertions pass')
      t.end()
    })
}

test('Should return hello world', helloWorldTest)
test('Test nginx cache', helloWorldTest)
