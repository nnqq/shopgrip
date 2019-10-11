import { User } from '../../database/schemas/user';

export const action = 'get';

export interface Params {
  projection: string[];
  userIds?: string[];
}

export interface Response {
  users: User[];
}
