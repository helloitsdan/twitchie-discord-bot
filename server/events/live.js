const client = require('../client')
const emitter = require('../emitter')
const logger = require('../logger')

const { getNotificationsForUser } = require('../../db/notifications')

emitter.on('live', async (stream) => {
  const {
    message,
    channels: toNotify,
  } = getNotificationsForUser(stream.user_id)

  logger.info('Someone is live!')

  toNotify.forEach(async (channelId) => {
    const channel = client.channels.get(channelId)

    if (!channel) {
      throw new TypeError(`Twitchie is not currently connected to Channel ID ${channelId}!`)
    }

    await channel.send(
      message,
      {
        embed: {
          color: 0x6441A4,
          url: 'http://twitch.tv/thewitchzone',
          title: stream.title,
          timestamp: stream.started_at,
          author: {
            name: 'Twitch',
          },
          image: {
            url: stream.thumbnail_url,
          },
          thumbnail: {
            url: stream.thumbnail_url,
          },
        },
      },
    )

    logger.info(`Notified #${channel.name}!`)
  })
})
