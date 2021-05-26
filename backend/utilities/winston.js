const winston = require('winston');

require('winston-mongodb');

const myFormat = winston.format.printf(
  ({ level, message, timestamp, stack }) => {
    return JSON.stringify({
      timestamp,
      level,
      message,
      stack,
    });
  }
);

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), myFormat),
  transports: [
    new winston.transports.MongoDB({
      filename: 'error.log',
      handleExceptions: true,
      level: 'error',
      db: 'mongodb+srv://admin:admin@cluster0.kkbeu.mongodb.net/express-x-you?retryWrites=true&w=majority',
    }),
  ],
});

module.exports = { logger };
