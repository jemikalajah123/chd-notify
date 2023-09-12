import { Schema, model } from 'mongoose';
import { IChannel } from '../types/Model/i-channel';
import { ITemplate } from '../types/Model/i-template';

// Create the role schema
const TemplateSchema = new Schema<ITemplate>(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
    },
    text: {
      type: String,
      required: true,
      minlength: 3,
    },
    type: {
      type: String,
      enum: [IChannel.EMAIL, IChannel.SMS],
      default: IChannel.EMAIL,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 3,
      unique: true,
    },
    html: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export template model
export const TemplateModel = model<ITemplate>('Templates', TemplateSchema);
