export const action = 'decrementUrlsCount';

export interface Params {
  userId: string;
}

export interface Response {
  updatedUsersCount: number;
}
