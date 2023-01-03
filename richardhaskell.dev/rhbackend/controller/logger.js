const { createLogger, transports, format } = require('winston');

//const (createLogger) = require('winston');

const appLogger = createLogger({
  level: 'info',
  format: format.combine(format.json(),format.timestamp()),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  appLogger.add(new transports.Console({
    format: format.simple(),
  }));
}
module.exports = {appLogger}