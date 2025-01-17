import { createLogger, format, transports } from 'winston';
const { combine, timestamp, json } = format;

const logger = createLogger({
  //   defaultMeta: { some: 'some..' },
  format: combine(timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

export default logger;
