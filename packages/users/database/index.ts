import {
  connect, model, Model, Document,
} from 'mongoose';
import { userSchema } from './schemas/user';
import { MONGO_URI } from '../constants';

export interface User extends Document {
  userId: string;
  vkId: number;
  urlsCount: number;
}

export const db: {
  users: Model<User>;
} = {
  users: model('User', userSchema),
};

connect(MONGO_URI, {
  autoIndex: process.env.NODE_ENV === 'development',
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
