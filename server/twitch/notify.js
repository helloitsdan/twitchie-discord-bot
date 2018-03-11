const streamEvents = require('../events')
var express = require('express')
var app = express()

app.get('/notify', function (req, res) {
  streamEvents.emit('live')
  res.send('OK')
})

app.listen(3000)
