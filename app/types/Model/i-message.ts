import { IChannel } from './i-channel';
import { IMessagePriority } from './i-message-priority';
import { IRecipient } from './i-recipient';

/**
//  *  @param  {boolean} sendIndividually - if you want to personalize messages and render recipient name on the template
 * Message interface
 */
export interface IMessageDraft {
  messageId: string;
  title?: string; 
  html?: string;
  text?: string;
  template?: string;
  priority: IMessagePriority;
  channels: IChannel[];
  recipients: IRecipient[];
  data: object;
  webhook?: string;
  // sendIndividually: boolean;
}


export interface IMessage extends Partial<IMessageDraft> {}