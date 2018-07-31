const winston = require('winston');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
          json: false,
          colorize: true,
          timestamp: true
        })
      ]
  });
export default logger;