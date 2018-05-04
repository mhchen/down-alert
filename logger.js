const { format, transports, createLogger: createWinstonLogger } = require('winston');

const createLogger = (options) => {
  const config = {
    level: options.logLevel,
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.printf(info => (
        `[${info.timestamp} ${info.level.toUpperCase()}] ${info.message}`
      )),
    ),
    transports: [
      new transports.Console({
        timestamp: true,
      }),
    ],
  };
  if (options.logFile) {
    config.transports.push(new transports.File({
      filename: options.logFile,
    }));
  }

  return createWinstonLogger(config);
};

module.exports = {
  createLogger,
};
