const path = require('path')

const Discord = require('discord.js')
const client = new Discord.Client()

const streamEvents = require('./events')

const avatarURL = path.join(__dirname, '..', 'assets', 'avatar.png')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)

  client.user.setAvatar(avatarURL)
  client.user.setActivity(
    `for streams!`,
    {
      type: 'WATCHING',
    },
  );
})

client.on('message', () => {

})

streamEvents.on('live', () => {
  console.log('Someone is live!')
})

client.login(process.env.TWITCHIE_CLIENT_TOKEN)
