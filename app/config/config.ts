import { config } from 'dotenv';
import fs from 'fs';
import { join, resolve, normalize } from 'path';
config();

const configuration = {
  appname: 'NotificationService',
  isProductionMode: process.env.NODE_ENV != 'development',
  deferredRunnerDelay: parseInt(process.env.DEFERRED_RUNNER_DELAY),
  web: {
    port: process.env.PORT || '8084',
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    db: parseInt(process.env.REDIS_DB) || 0,
  },
  sms: {
    apiKey: process.env.SMS_API_KEY,
  },
  mail: {
    apiKey: process.env.MAIL_API_KEY,
    mailDomain: process.env.MAIL_DOMAIN,
    mandrillKey: process.env.MANDRILL_KEY,
  },
  mongo: {
    uri: process.env.DATABASE,
    auth_db: process.env.AUTH_DATABASE,
  },
};

export default configuration;
