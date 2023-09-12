import { SmsService } from '../sms.service';
import axios, { AxiosInstance } from 'axios';
import config from '../../../../config/config';
import { ISmsMessage } from '../../../../types/Model/i-sms-message';
import { MailResponse } from '../../mail/mail.service';

export class TermiiSmsService extends SmsService {
  apiKey: string;
  client: AxiosInstance;
  constructor(sender: string) {
    super(sender);

    this.apiKey = config.sms.apiKey;
    this.client = axios.create({
      baseURL: 'https://termii.com/api/sms',

      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async send(data: ISmsMessage): Promise<MailResponse> {
    const payload = {
      to: data.to,
      from: this.sender,
      sms: data.sms,
      type: 'plain',
      channel: 'generic', //'dnd', //'
      api_key: this.apiKey,
    };
    

    try {
      const response = await this.client.post('/send', payload);
      if (response.data) {
        return { data };
      }
    } catch (error) {
      console.log(error); 
      return { error };
    }
  }
}
