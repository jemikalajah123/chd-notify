import { container, injectable } from 'tsyringe';
import { LoggerService } from './logger.service';
import Validator from '../validators/validator';
import { QueueService } from './queue.service';
import ResponseMessages from '../lib/response-messages';
import { IMessage } from '../types/Model/i-message';
import { QueueModel } from '../model/queue.model';
import { TemplateModel } from '../model/template.model';
import { NotificationModel } from '../model/notification.model';
import { Types } from 'mongoose';

@injectable()
export class MessageService {
  private validator: Validator = new Validator();

  constructor(private logger: LoggerService) {}

  send = async (req, res) => {
    const message: IMessage = req.body;
    try {
      this.validator.validateNotification(message);

      const template = await TemplateModel.findOne({
        slug: message.template,
      }).exec();

      if (!template || !template._id) {
        return res.status(400).json({
          status: ResponseMessages.STATUS_FAILED,
          message: ResponseMessages.TEMPLATE_NOT_FOUND,
        });
      }
      const result = await QueueModel.create(message);

      res.status(result ? 200 : 400).json({
        status: result
          ? ResponseMessages.STATUS_SUCCESS
          : ResponseMessages.STATUS_FAILED,
        data: result,
        message: ResponseMessages.NOTIFICATION_QUEUED,
      });
    } catch (error) {
      this.logger.error(error);
      // console.log(error);
      res.status(400).json({
        status: ResponseMessages.STATUS_FAILED,
        data: null,
        message: error.message,
      });
      return;
    }
  };

  userNotifications = async (req, res) => {
    const { id } = req.body;
    try {
      const data = await NotificationModel.find({
        recipient: new Types.ObjectId(id),
      }).sort({ createdAt: -1 });

      const unreadCount = await NotificationModel.find({
        recipient: new Types.ObjectId(id),
        read: false,
      }).countDocuments();

      res.status(200).json({
        status: ResponseMessages.STATUS_SUCCESS,
        data: { unreadCount, data },
        message: 'Notification fetched successfully',
      });
      return;
    } catch (error) {
      this.logger.error(error);
      res.status(400).json({
        status: ResponseMessages.STATUS_FAILED,
        data: null,
        message: error.message,
      });
      return;
    }
  };

  readNotification = async (req, res) => {
    const { notificationId } = req.body;
    try {
      await NotificationModel.updateOne(
        {
          _id: notificationId,
        },
        {
          read: true,
          readAt: new Date(),
        }
      );
      res.status(200).json({
        status: ResponseMessages.STATUS_SUCCESS,
        message: 'Notification read successfully',
      });
      return;
    } catch (error) {
      this.logger.error(error);
      res.status(400).json({
        status: ResponseMessages.STATUS_FAILED,
        data: null,
        message: error.message,
      });
      return;
    }
  };

  markAllAsRead = async (req, res) => {
    const { userID } = req.body;
    try {
      await NotificationModel.updateMany(
        {
          recipient: userID,
        },
        {
          read: true,
          readAt: new Date(),
        }
      );
      res.status(200).json({
        status: ResponseMessages.STATUS_SUCCESS,
        message: 'Notifications marked as read successfully',
      });
      return;
    } catch (error) {
      this.logger.error(error);
      res.status(400).json({
        status: ResponseMessages.STATUS_FAILED,
        data: null,
        message: error.message,
      });
      return;
    }
  };

  createNotification = async (req, res) => {
    const { recipient, body, title, link } = req.body;
    try {
      const data = await NotificationModel.create({
        recipient,
        body,
        link,
        title,
      });

      res.status(200).json({
        status: ResponseMessages.STATUS_SUCCESS,
        data,
        message: 'Notification created successfully',
      });
      return;
    } catch (error) {
      this.logger.error(error);
      res.status(400).json({
        status: ResponseMessages.STATUS_FAILED,
        data: null,
        message: error.message,
      });
      return;
    }
  };

}
