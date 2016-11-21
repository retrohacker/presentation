var express = require('express')
var app = express()
var log = require('./produce.js')

var response = 'Hello World!'

app.get('/', function (req, res) {
  res.send(response)
  log(response)
})

/* istanbul ignore next */
function onListen () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
}

/* istanbul ignore next */
if(module.parent) {
  module.exports = app
} else {
  server = app.listen(3000, onListen)
}
