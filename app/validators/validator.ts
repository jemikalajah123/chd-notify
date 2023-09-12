import validator from 'validator';
import { IChannel } from '../types/Model/i-channel';
import { IMessage } from '../types/Model/i-message';

enum ErrorMessages {
  MUST_HAVE_VALID_BODY = 'Message must have a valid template name or an html or text body',
  MUST_HAVE_VALID_CHANNEL = 'Message must have a valid channel',
  MUST_HAVE_VALID_SMS_RECIPIENT = 'SMS must have at least one recipient with a valid phone number',
  MUST_HAVE_VALID_EMAIL_RECIPIENT = 'EMAIL must have at least one recipient with a valid email',
  MUST_HAVE_VALID_RECIPIENT = 'EMAIL must have at least one recipient',
}

export default class Validator {
 
  public validateNotification(message: IMessage): boolean {
    // message must have a valid template name or an html or text body
    if (
      String(message.template || '').length < 5 &&
      String(message.html || '').length < 5 &&
      String(message.text || '').length < 5
    ) {
      throw new Error(ErrorMessages.MUST_HAVE_VALID_BODY);
    }

    //channels must be an array and must contain at least one channel
    if (
      !message.channels ||
      !message.channels.length ||
      message.channels.length < 1
    ) {
      throw new Error(ErrorMessages.MUST_HAVE_VALID_CHANNEL);
    }

    for (let a = 0; a < message.channels.length; a++) {
      const element = message.channels[a];

      if (element !== IChannel.SMS && element !== IChannel.EMAIL) {
        throw new Error(ErrorMessages.MUST_HAVE_VALID_CHANNEL);
      }
    }

    if (
      !message.recipients ||
      message.recipients.filter(
        (value) => String(value.email).length > 2 || String(value.phone).length > 5
      ).length < 1
    ) {
      throw new Error(ErrorMessages.MUST_HAVE_VALID_RECIPIENT);
    }

    // channels must be an array and must contain at least one channel
    // console.log(message.channels.includes(IChannel.EMAIL));
    // console.log(message.channels);
    if (message.channels.includes(IChannel.EMAIL)) {
      const validEmailRecipients = message.recipients.filter(
        (recipient) => recipient.email && validator.isEmail(recipient.email)
      );
      //   console.log('message.channels', validEmailRecipients);
      if (message.recipients.length < 1 || validEmailRecipients.length < 1) {
        throw new Error(ErrorMessages.MUST_HAVE_VALID_EMAIL_RECIPIENT);
      }
    }
    if (message.channels.includes(IChannel.SMS)) {
      const validSMSRecipients = message.recipients.filter(
        (recipient) => recipient.phone && String(recipient.phone).length > 5
      );
      //   console.log('message.channels', validSMSRecipients);
      if (message.recipients.length < 1 || validSMSRecipients.length < 1) {
        throw new Error(ErrorMessages.MUST_HAVE_VALID_SMS_RECIPIENT);
      }
    }

    return true;
  }
}
