import { Schema } from 'mongoose';
import uuidv4 from 'uuid/v4';
import { textConcat } from '../../../lib/helpers/textConcat';
import { textCantAdd } from '../../../lib/helpers/textCantAdd';
import { textTryAgain } from '../../../lib/helpers/textTryAgain';

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
  shop: {
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
}).post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error(textConcat(textCantAdd(), 'Данный товар уже есть в твоем списке отслеживания', textTryAgain())));
  } else {
    next(error);
  }
});
