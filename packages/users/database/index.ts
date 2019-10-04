import {
  connect, model, Model, Document,
} from 'mongoose';
import { userSchema } from './schemas/user';

export type User = {
  userId: string
  vkId: number
  linksCount: number
} & Document

export const db: {
  users: Model<User>,
} = {
  users: model('User', userSchema),
};

connect(process.env.MONGO_URI, {
  autoIndex: process.env.NODE_ENV === 'development',
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
