const fetch = require('node-fetch')
const querystring = require('querystring')

const twitchWebhooksURL = 'https://api.twitch.tv/helix/webhooks/hub'

const webhookOptions = {
  'hub.mode': 'subscribe',
  'hub.topic': 'https://api.twitch.tv/helix/streams?user_id=1337',
  'hub.callback': 'http://twitchie.stream.witch.zone/notify',
  'hub.lease_seconds': '864000',
  'hub.secret': 'twitchie',
};

(async () => {
  const webhookURL = `${twitchWebhooksURL}?${querystring.stringify(webhookOptions)}`
  const response = await fetch(webhookURL)

  console.log(await response.json())
})()
