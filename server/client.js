const Discord = require('discord.js')
const client = new Discord.Client()
const streamEvents = require('./events')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

streamEvents.on('live', () => {
  console.log('someone is live')
})

client.login(process.env.TWITCHIE_CLIENT_TOKEN)
