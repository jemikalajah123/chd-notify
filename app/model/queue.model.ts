import { Schema, model } from 'mongoose';
import { IChannel } from '../types/Model/i-channel';
import { IMessage } from '../types/Model/i-message';
import { IMessagePriority } from '../types/Model/i-message-priority';
import { IRecipient } from '../types/Model/i-recipient';

export type IQueue = IMessage & {
  attempts: number;
  error?: object
};
const recipientSchema = new Schema<IRecipient>({
  email: String,
  phone: String,
  lastName: String,
  firstName: String,
  pushToken: [String],
});

// Create the role schema
const QueueSchema = new Schema<IQueue>(
  {
    messageId:  {
      type: String,
    },
    title: {
      type: String,
    },
    html: {
      type: String,
    },
    text: {
      type: String,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    template: {
      type: String,
    },
    priority: {
      type: String,
      enum: [IMessagePriority.HIGH, IMessagePriority.MEDIUM, IMessagePriority.LOW],
      default: IMessagePriority.LOW,
    },
    channels: {
      type: [String],
      enum: [IChannel.EMAIL, IChannel.SMS],
      default: [IChannel.EMAIL],
    },
    recipients: {
      type: [recipientSchema],
    },
    data: Schema.Types.Mixed,
    webhook: String,
    error: Schema.Types.Map,
    // sendIndividually: Boolean,
  },
  {
    timestamps: true,
  }
);

// Create and export Queue model
export const QueueModel = model<IQueue>('queue', QueueSchema);
export const FailedQueueModel = model<IQueue>('failed-queue', QueueSchema);
