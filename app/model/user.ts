import mongoose, { Schema } from 'mongoose';
import configuration from '../config/config';

const db = mongoose.createConnection(configuration.mongo.auth_db);

// Create and export models
export const Customer = db.model(
  'User',
  new Schema({
    userType: String,
    status: Boolean,
    isVerified: Boolean,
  })
);
