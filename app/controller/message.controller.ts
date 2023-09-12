import { container, injectable } from 'tsyringe';
import { uid } from 'uid';
import { TemplateService } from '../services/template.service';
import { MessageService } from '../services/message.service';

@injectable()
export class MessageController {
  constructor(private messageService: MessageService) {}

  send = async (req, res) => {
    this.messageService.send(req, res);
  };

  createNotification = async (req, res) => {
    this.messageService.createNotification(req, res);
  };

  userNotifications = async (req, res) => {
    this.messageService.userNotifications(req, res);
  };

  readNotification = async (req, res) => {
    this.messageService.readNotification(req, res);
  };

  markAllAsRead = async (req, res) => {
    this.messageService.markAllAsRead(req, res);
  };
}
