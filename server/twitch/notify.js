const streamEvents = require('../events')
var express = require('express')
var app = express()

const fakeResponse = {
  "id":"0123456789",
  "user_id":"5678",
  "game_id":"21779",
  "community_ids":[],
  "type":"live",
  "title":"Best Stream Ever",
  "viewer_count":417,
  "started_at":"2017-12-01T10:09:45Z",
  "language":"en",
  "thumbnail_url":"https://pbs.twimg.com/profile_images/925750555770851328/rFpJ0fuM_400x400.jpg",
}

app.get('/notify', function (req, res) {
  streamEvents.emit('live', fakeResponse)
  res.send('OK')
})

app.listen(3000)
