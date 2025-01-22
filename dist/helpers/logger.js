"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, json } = winston_1.format;
const logger = (0, winston_1.createLogger)({
    //   defaultMeta: { some: 'some..' },
    format: combine(timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), json()),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.transports.File({ filename: 'combined.log' }),
    ],
});
exports.default = logger;
