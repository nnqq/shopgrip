export const action = 'get';

export interface Params {
  userId: string;
  count?: number;
  offset?: number;
}

export interface Response {
  count: number;
  offset: number;
  totalCount: number;
  urls: Array<{
    shop: string;
    title: string;
    price: number;
    vkUrl: string;
  }>;
}
