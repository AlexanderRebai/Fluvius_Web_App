
const winston = require('winston');
const {
  combine, timestamp, colorize, printf, json,
} = winston.format;

let logger;

const devFormat = () => {
  const formatMessage = ({
    level, message, timestamp, name = 'server', ...rest
  }) => `${timestamp} | ${name} | ${level} | ${message} | ${JSON.stringify(rest)}`;

  const formatError = ({
    error: { stack }, ...rest
  }) => `${formatMessage(rest)}\n\n${stack}\n`;
  const format = (info) => info.error instanceof Error ? formatError(info) : formatMessage(info);
  return combine(
    colorize(), timestamp(), printf(format),
  );
};

const prodFormat = () => {
  // Error have no proper toJSON, so create a new plain object
  const replaceError = ({ label, level, message, stack }) => ({ label, level, message, stack });
  const replacer = (_, value) => value instanceof Error ? replaceError(value) : value;
  return json({ replacer });
};

/**
 * Get the root logger.
 */
const getLogger = () => {
  if (!logger) throw new Error('You must first initialize the logger');
  return logger;
};

/**
 * Get a child logger from the root logger.
 */
const getChildLogger = (name, meta = {}) => {
  const logger = getLogger();
  const previousName = logger.defaultMeta?.name;

  return logger.child({
    name: previousName ? `${previousName}.${name}` : name,
    previousName,
    ...meta,
  });
};

/**
 * Initialize the root logger.
 *
 * @param {object} options - The log options.
 * @param {string} options.level - The log level.
 * @param {boolean} options.disabled - Disable all logging.
 * @param {boolean} options.isProduction - Whether the server runs in production.
 * @param {object} options.defaultMeta - Default metadata to show.
 * @param {winston.transport[]} options.extraTransports - Extra transports to add besides console.
 */
const initializeLogger = ({
  level,
  disabled,
  isProduction,
  defaultMeta = {},
  extraTransports = [],
}) => {
  logger = winston.createLogger({
    level,
    defaultMeta,
    format: isProduction ? prodFormat() : devFormat(),
    transports: [
      new winston.transports.Console({
        silent: disabled,
      }),
      ...extraTransports,
    ],
  });

  logger.info(` Logger initialized with minimum log level ${level}`);
};

module.exports = {
  getLogger,
  getChildLogger,
  initializeLogger,
};