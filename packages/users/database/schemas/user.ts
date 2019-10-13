import { Schema } from 'mongoose';
import uuidv4 from 'uuid/v4';

export interface UserLean {
  userId: string;
  vkId: number;
}

export const userSchema = new Schema({
  userId: {
    type: String,
    default: uuidv4,
  },
  vkId: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
}).index({
  vkId: 1,
}, {
  unique: true,
}).index({
  userId: 1,
});
