/** @format */

import { injectable } from 'tsyringe';
import winston from 'winston';

@injectable()
export class LoggerService {
  logger: any;
  constructor() {
    this.logger = {
      infoLog: winston.createLogger({
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.label({
            label: `Go! 🏷️🌍🐳🛢`,
          }),
          winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss',
          }),
          winston.format.printf(
            (info: { level: any; label: any; timestamp: any; message: any }) =>
              `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`
          )
        ),
        transports: [new winston.transports.Console()],
      }),

      errorLog: winston.createLogger({
        level: 'error',
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.label({
            label: `Go! 🏷️🌍🐳🛢`,
          }),
          winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss',
          }),
          winston.format.printf(
            (error: { level: any; label: any; timestamp: any; message: any }) =>
              `${error.level}: ${error.label}: ${[error.timestamp]}: ${
                error.message
              }`
          )
        ),
        transports: [new winston.transports.Console()],
      }),
    };
  }

  log(data: any) {
    return this.logger.infoLog.info(`${data}`);
  }

  error(data: any) {
    return this.logger.errorLog.error(`${data}`);
  }
}
