// Publisher
var amqp = require('amqplib/callback_api')
var async = require('async')
var q = 'log'
var conn
var callback

function connect () {
  async.during(singleConnect, waitingForConnection, function (e) {
    console.log('Connected to RabbitMQ!')
    conn.createChannel(function on_open (e, ch) {
      if (e != null) return console.error(e)
      ch.assertQueue(q)
      ch.consume(q, function (msg) {
        if (msg !== null) {
          callback(msg.content.toString())
          ch.ack(msg)
        }
      })
    })
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

module.exports = function on_log (cb) {
  callback = cb
}
