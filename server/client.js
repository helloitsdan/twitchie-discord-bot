const path = require('path')

const Discord = require('discord.js')
const client = new Discord.Client()

const streamEvents = require('./events')
const logger = require('./logger')
const db = require('./db')

const avatarURL = path.join(__dirname, '..', 'assets', 'avatar.png')

client.on('ready', () => {
  logger.info(`Logged in as ${client.user.tag}!`)

  // client.user.setAvatar(avatarURL)
  client.user.setActivity(
    `for streams!`,
    {
      type: 'WATCHING',
    },
  );
})

streamEvents.on('live', async (stream) => {
  const {
    message,
    channels: toNotify,
  } = db.get('notifications')
    .find({ user_id: stream.user_id })
    .value()

  logger.info('Someone is live!')

  toNotify.forEach(async (channelId) => {
    const channel = client.channels.get(channelId)

    if (!channel) {
      throw new TypeError(`Twitchie is not currently connected to Channel ID ${channelId}!`)
    }

    const response = await channel.send(
      message,
      {
        embed: {
          color: 0x6441A4,
          url: 'http://twitch.tv/thewitchzone',
          title: stream.title,
          timestamp: stream.started_at,
          author: {
            name: "Twitch",
          },
          image: {
            url: stream.thumbnail_url,
          },
          thumbnail: {
            url: stream.thumbnail_url,
          }
        },
      }
    )

    logger.info(`Notified #${channel.name}!`)
  })
})

client.login(process.env.TWITCHIE_CLIENT_TOKEN)
