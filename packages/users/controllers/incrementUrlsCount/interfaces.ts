export const action = 'incrementUrlsCount';

export interface Params {
  userId: string;
}

export interface Response {
  updatedUsersCount: number;
}
