import { Document } from 'mongoose';
import { IChannel } from './i-channel';

export interface ITemplate extends Document {
  title: string;
  text: string;
  type: IChannel.EMAIL | IChannel.SMS;
  html: string;
  slug: string;
}
