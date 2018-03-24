const { createLogger, format, transports } = require('winston')

const logMessage = format.printf(
  ({
    timestamp,
    level,
    message,
    ...rest
  }) => (
    `${timestamp} ${level}: ${message} ${JSON.stringify(rest)}`
  )
)

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'HH:mm MM-DD-YYYY',
    }),
    format.prettyPrint(),
    logMessage,
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'combined.log',
      level: 'info',
    }),
    new transports.File({
      filename: 'errors.log',
      level: 'error',
    }),
  ]
})

module.exports = logger
