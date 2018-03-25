const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('data/notifications.json')
const db = lowdb(adapter)

db.defaults({
  notifications: [],
})
  .write()

module.exports = db
