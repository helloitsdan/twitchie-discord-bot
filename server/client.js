const path = require('path')
const Discord = require('discord.js')
const logger = require('./logger')

const client = new Discord.Client()
const avatarURL = path.join(__dirname, '..', 'assets', 'avatar.png')

client.on('ready', () => {
  logger.info(`Logged in as ${client.user.tag}!`)

  client.user.setAvatar(avatarURL)
  client.user.setActivity(
    'for streams!',
    {
      type: 'WATCHING',
    },
  )
})

client.login(process.env.TWITCHIE_CLIENT_TOKEN)

module.exports = client
