export const action = 'delete';

export interface Params {
  userId: string;
  vkUrl: string;
}

export interface Response {
  deletedCount: number;
}
