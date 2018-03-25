const db = require('./index')

const getNotifications = () => (
  db.get('notifications')
)

const getNotificationsForUser = (userId) => (
  getNotifications()
    .find({ user_id: userId })
    .value()
)

module.exports = {
  getNotificationsForUser,
}
