var express = require('express')
var app = express()
var log = require('./produce.js')

var response = "Hello World!"


app.get('/', function (req, res) {
  res.send(response)
  log(response)
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

