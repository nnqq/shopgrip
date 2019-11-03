export const action = 'delete';

export interface Params {
  userId: string;
  origUrlOrVkUrlOrPrice: string;
}

export type Response = {
  title: string;
  price: number;
  shop: string;
  vkUrl: string;
} | null;
