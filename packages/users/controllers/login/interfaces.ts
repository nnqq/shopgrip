export const action = 'login';

export interface Params {
  vkId: number;
}

export interface Response {
  userId: string;
}
