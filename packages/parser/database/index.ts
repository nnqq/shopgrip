import {
  connect, model, Model, Document,
} from 'mongoose';
import { urlSchema } from './schemas/url';

export interface Url extends Document {
  userId: string;
  price: number;
  title: string;
  origUrl: string;
  vkUrl: string;
  refUrl: string;
}

export const db: {
  users: Model<Url>;
} = {
  users: model('Url', urlSchema),
};

connect(process.env.MONGO_URI, {
  autoIndex: process.env.NODE_ENV === 'development',
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
