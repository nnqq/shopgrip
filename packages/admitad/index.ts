import { ServiceBroker } from 'moleculer';
import { ADMITAD } from './constants';
import { dotConcat } from '../lib/helpers/dotConcat';
import { Params as GetRefUrlParams, Response as GetRefUrlResponse, action as getRefUrlAction } from './controllers/getRefUrl/interfaces';

export const admitad = {
  getRefUrl(broker: ServiceBroker, params: GetRefUrlParams): PromiseLike<GetRefUrlResponse> {
    return broker.call<GetRefUrlResponse, GetRefUrlParams>(
      dotConcat(ADMITAD, getRefUrlAction),
      params,
    );
  },
};
