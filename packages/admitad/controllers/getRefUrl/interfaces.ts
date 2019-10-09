export const action = 'getRefUrl';

export interface Params {
  url: string;
  userId: string;
}

export interface Response {
  refUrl: string | null;
}
