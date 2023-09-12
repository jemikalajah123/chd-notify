import validator from 'validator';
import { container } from 'tsyringe';
import { IMessageConfiguration } from '../types/Model/i-mail-configuration';
import { MailgunEmailService } from './integration/mail/impl/mailgun-email.service';
import { MandrillEmailService } from './integration/mail/impl/mandrill-email.service';
import { TermiiSmsService } from './integration/sms/impl/termii-sms.service';
import { TemplateProcessorService } from './template-processor.service';
import { QueueModel, FailedQueueModel } from '../model/queue.model';
import { TemplateService } from './template.service';
import { LoggerService } from './logger.service';
import { uid } from 'uid';
import { MailResponse } from './integration/mail/mail.service';
import config from '../config/config';
import { IChannel } from '../types/Model/i-channel';
import { IMessage } from '../types/Model/i-message';
import { IMessagePriority } from '../types/Model/i-message-priority';
import { IRecipient } from '../types/Model/i-recipient';

export class QueueService {
  retryLimit: number = 5;
  configuration: IMessageConfiguration;
  templateProcessor: TemplateProcessorService;
  templateService: TemplateService;
  logger: LoggerService;

  constructor() {
    this.configuration = {
      sms: new TermiiSmsService('Citisquare'),
     // email: new MandrillEmailService('InvestNaija <info@investnaija.com>')
      email: new MailgunEmailService('InvestNaija <info@investnaija.com>'),
    };
    this.templateProcessor = new TemplateProcessorService();
    this.templateService = container.resolve(TemplateService);
    this.logger = container.resolve(LoggerService);

    // this
  }

  /**
   * @param  {IMessage} message
   * handle message from queue
   */
  async handle(message: IMessage, done: Function) {
    this.logger.log('Queue processor new message received');
    // only sending high priority emails immediately

    message.messageId = message.messageId || uid(20);
    switch (message.priority) {
      case IMessagePriority.OTP:
      case IMessagePriority.HIGH:
        this.send(message);
        break;
      case IMessagePriority.MEDIUM:
      case IMessagePriority.LOW:
      default:
        // save lower priority messages
        await QueueModel.create(message);
        break;
    }
    done();
  }

  /**
   * @param  {IMessage} message
   * send message to selected channels
   */
  async send(message: IMessage, attempts: number = 0) {
    this.logger.log(`Sending message ${message}`);
    const template = (await this.templateService.getTemplateFromSlug(
      message.template
    )) || { text: '', title: '', html: '' };

    // this.logger.log(`Sending message -  ${template}`);
    let recipients = message.recipients;
    let failed: IRecipient[] = [];

    for (let i = 0; i < recipients.length; i++) {
      const user = recipients[i];

      let data = { ...message.data, user };

      const text = this.templateProcessor.render(
        message.text || template.text,
        data
      );
      const subject = this.templateProcessor.render(
        message.title || template.title,
        data
      );
      const html = this.templateProcessor.render(
        message.html || template.html,
        data
      );
      // console.log(subject, text, data);

      let promise: Promise<MailResponse>[] = [];

      if (
        message.channels.includes(IChannel.EMAIL) &&
        validator.isEmail(user.email)
      ) {
        this.logger.log(`Sending message ${user}`);
        promise.push(
          this.configuration.email.send({
            html,
            text,
            subject,
            to: user.email,
          })
        );
      }
      if (message.channels.includes(IChannel.SMS) && String(text).length > 5) {
        /// TODO: implement a validator for phone number
        promise.push(
          this.configuration.sms.send({
            to: user.phone,
            sms: text,
          })
        );
      }
      /// execute notifications if valid
      if (promise.length > 0) {
        const results = await Promise.allSettled(promise);
        // if the message has been sent to at least one channel, mark notification as dispatched
        if (results.filter((val) => val.status == 'fulfilled').length > 0) {
          await QueueModel.findOneAndDelete({ messageId: message.messageId });
          /// TODO: log analytics
        } else {
          failed.push(user);
        }
      } else {
        failed.push(user);
      }
    }
    // if there was a failed notification, save only recipient that didn't receive
    if (failed.length > 0) {
      if (attempts > this.retryLimit) {
        await FailedQueueModel.findOneAndUpdate(
          { messageId: message.messageId },
          { recipients: failed, attempts: attempts + 1 },
          { upsert: true }
        ).exec();
        await QueueModel.findOneAndDelete({ messageId: message.messageId });
      } else {
        await QueueModel.findOneAndUpdate(
          { messageId: message.messageId },
          { recipients: failed, attempts: attempts + 1 },
          { upsert: true }
        ).exec();
      }
    }
  }

  /**
   *
   * @param {number} page - offset to fetch from database
   *
   * Handle lower priority notifications
   */
  async deferred(page: number) {
    this.logger.log('Running deferred queue runner');
    const limit = 10;
    let data = await QueueModel.find({})
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      await this.send(element, element.attempts);
    }

    await this.delay(config.deferredRunnerDelay || 2000);

    this.deferred(data.length < limit ? 1 : page + 1);
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
