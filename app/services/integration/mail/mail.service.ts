import { type } from 'os';
import { IEmailMessage } from '../../../types/Model/i-emai-message';

export type MailResponse = {error?,  data?};
export abstract class MailService {
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
  abstract send(data: IEmailMessage): Promise<MailResponse>;
}
