import { Schema } from 'mongoose';

export const urlSchema = new Schema({
  userId: {
    type: String,
    required: true,
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
  refUrl: String,
}, {
  timestamps: true,
}).index({
  userId: 1,
  origUrl: 1,
}, {
  unique: true,
});
