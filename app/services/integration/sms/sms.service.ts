import { ISmsMessage } from '../../../types/Model/i-sms-message';
import { MailResponse } from '../mail/mail.service';

export abstract class SmsService {
  sender: string;

  constructor(sender: string) {
    this.sender = sender;
  }

  /**
   * @param  {any} data
   * @param  {Function} done
   * @returns Promise
   * send email
   */
  abstract send(data: ISmsMessage): Promise<MailResponse>;
}
