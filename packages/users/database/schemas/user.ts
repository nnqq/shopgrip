import { Schema } from 'mongoose';
import uuidv4 from 'uuid/v4';

export const userSchema = new Schema({
  userId: {
    type: String,
    default: uuidv4,
  },
  vkId: {
    type: Number,
    required: true,
  },
  urlsCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
}).index({
  vkId: 1,
}, {
  unique: true,
});
