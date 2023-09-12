import { Document, Types } from 'mongoose';

export interface INotification extends Document {
  _id: Types.ObjectId;
  recipient: Types.ObjectId;
  body: string;
  title: string;
  link: string;
  readAt: Date;
  read: boolean;
}
