import 'reflect-metadata';
import express, { Application } from 'express';
import config from './app/config/config';
import { Routes } from './app/routes';
import cors from 'cors';
import mongoose from 'mongoose';
import { default as FourOFourRouter } from './app/routes/four-ofour-router';
import { default as ErrorRouter } from './app/routes/error-router';

import { container, delay } from 'tsyringe';
import { LoggerService } from './app/services/logger.service';
import { QueueService } from './app/services/queue.service';
const logger: any = container.resolve(LoggerService);

class Server {
  private app: Application;
  private logger: LoggerService;

  constructor() {
    this.app = express();
    this.logger = new LoggerService();
  }

  private mongooseConnection() {
    mongoose
      .connect(config.mongo.uri)
      .then(() => logger.log('Database Connected'))
      .catch((err) => {
        logger.error(err);
      });

    mongoose.connection.on('error', (err) => {
      logger.error(`DB connection error: ${err.message}`);
    });
  }

  public configuration() {
    this.mongooseConnection();
    this.app.use(cors());
    this.app.use(express.json());
    container.resolve<QueueService>(QueueService).deferred(1);

    this.app.use('/api', Routes);
    // four o four router
    this.app.use(FourOFourRouter);
    // error handler
    this.app.use(ErrorRouter);
  }

  public async start() {
    const PORT: any = config.web.port;
    //await this.createConnection()
    this.configuration();
    this.app.listen(PORT, () => {
      this.logger.log(`Server is listening on port ${PORT}. ${config.mongo}`);
    });
  }
}

const server = new Server();
// server.registerDependencies();
server.start();
