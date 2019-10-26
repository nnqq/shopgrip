import {
  connect, model, Model, Document,
} from 'mongoose';
import { urlSchema } from './schemas/url';
import { MONGO_URL } from '../constants';

export interface UrlLean {
  userId: string;
  urlId?: string;
  title: string;
  shop: string;
  price: number;
  origUrl: string;
  vkUrl: string;
  refUrl?: string;
}

export type Url = UrlLean & Document;

export const db: {
  urls: Model<Url>;
} = {
  urls: model('Url', urlSchema),
};

connect(MONGO_URL, {
  autoIndex: process.env.NODE_ENV === 'development',
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
