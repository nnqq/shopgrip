export const action = 'delete';

export interface Params {
  userId: string;
  origOrVkUrl: string;
}

export type Response = {
  title: string;
  price: number;
  shop: string;
  vkUrl: string;
} | null;
