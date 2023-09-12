import { Schema, model } from 'mongoose';
import { INotification } from '../types/Model/i-notification';
import { Customer } from './user';

// Create the notification schema
const NotificationSchema = new Schema<INotification>(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: Customer,
    },
    body: String,
    title: String,
    link: String,
    readAt: Date,
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export notification model
export const NotificationModel = model<INotification>(
  'Notification',
  NotificationSchema
);
