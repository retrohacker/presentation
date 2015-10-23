var express = require('express');
var app = express();
var on_log = require('./consume.js')

on_log(function log(msg) {
  console.log(msg)
})
