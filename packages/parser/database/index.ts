import {
  connect, model, Model, Document,
} from 'mongoose';
import { urlSchema } from './schemas/url';

export interface UrlLean {
  userId: string;
  price: number;
  title: string;
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

connect(process.env.MONGO_URI, {
  autoIndex: process.env.NODE_ENV === 'development',
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
