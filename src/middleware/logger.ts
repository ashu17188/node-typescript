/**Pino logger implementation - fastest nodejs logger available till date */
import pino = require('pino');
import expressPino from 'express-pino-logger';

export const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
export const expressLogger = expressPino({ logger });
