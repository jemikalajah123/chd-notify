import express, { Router, Application } from 'express';
import { container } from 'tsyringe';
import { MessageController } from '../controller/message.controller';
import MessageValidator from '../validators/message.validator';

const MessageRouter: Router = express.Router();
const controller: MessageController =
  container.resolve<MessageController>(MessageController);
const validator: any = container.resolve(MessageValidator); 

MessageRouter.post('/send', validator.validateInput, controller.send);
MessageRouter.post('/notification', controller.createNotification);
MessageRouter.put('/read-notification', controller.readNotification);
MessageRouter.put('/read-notification/all', controller.markAllAsRead);
MessageRouter.get('/notification', controller.userNotifications);

export default MessageRouter;
