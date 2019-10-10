import { Schema } from 'mongoose';
import uuidv4 from 'uuid/v4';

export const urlSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  urlId: {
    type: String,
    default: uuidv4,
  },
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  origUrl: {
    type: String,
    required: true,
  },
  vkUrl: {
    type: String,
    required: true,
  },
  refUrl: {
    type: String,
  },
}, {
  timestamps: true,
}).index({
  userId: 1,
  origUrl: 1,
}, {
  unique: true,
});
