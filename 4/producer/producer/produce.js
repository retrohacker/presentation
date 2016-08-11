// Publisher
var amqp = require('amqplib/callback_api')
var async = require('async')
var q = 'log'
var conn

function connect () {
  async.during(singleConnect, waitingForConnection, function (e) {
    console.log('Connected to RabbitMQ!')
  })
}

function singleConnect (cb) {
  console.log('Trying to connect to rabbitmq...')
  return amqp.connect('amqp://rabbitmq', function (e, c) {
    conn = c
    return cb(null, e)
  })
}

function waitingForConnection (cb) {
  console.log('Connection to rabbitmq failed, retrying...')
  setTimeout(cb, 1000)
}

connect()

module.exports = function log (string) {
  conn.createChannel(function on_open (e, ch) {
    if (e != null) {
      return console.log(e)
    }
    ch.assertQueue(q)
    ch.sendToQueue(q, new Buffer(string))
  })
}
