import { ServiceBroker } from 'moleculer';
import { Params as GetRefUrlParams, Response as GetRefUrlResponse, action as getRefUrlAction } from './controllers/getRefUrl/interfaces';
import { ADMITAD } from './constants';
import { dotConcat } from '../lib/helpers/dotConcat';

export const admitad = {
  getRefUrl(broker: ServiceBroker, params: GetRefUrlParams): PromiseLike<GetRefUrlResponse> {
    return broker
      .call<GetRefUrlResponse, GetRefUrlParams>(dotConcat(ADMITAD, getRefUrlAction), params);
  },
};
