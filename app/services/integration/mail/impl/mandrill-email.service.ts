import { MailResponse, MailService } from '../mail.service';
import Email from 'email-templates';
import nodemailer from 'nodemailer';
import mandrillTransport from 'nodemailer-mandrill-transport';
import config from '../../../../config/config';
import { IEmailMessage } from '../../../../types/Model/i-emai-message';

export class MandrillEmailService extends MailService {
  mailService: Email;

  constructor(sender: string) {
    super(sender);

    this.mailService = nodemailer.createTransport(
        mandrillTransport({
          auth: {
            api_key: config.mail.mandrillKey,
          },
        })
      )
  }

  async send(message: IEmailMessage): Promise<MailResponse> {
    try {
      message.from = this.sender
      message.replyTo = this.sender
      message.attachments = null
      console.log(message)
      const data = await this.mailService.sendMail({
        message: message,
        // locals: data.locals || {},
      });
      return { data };
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
}
