export const action = 'add';

export interface Params {
  userId: string;
  origUrl: string;
}

export interface Response {
  title: string;
  price: number;
  shop: string;
  vkUrl: string;
}
