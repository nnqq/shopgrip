import { ServiceBroker } from 'moleculer';
import { USERS } from './constants';
import { dotConcat } from '../lib/helpers/dotConcat';
import { Response as LoginResponse, Params as LoginParams, action as loginAction } from './controllers/login/interfaces';
import { Response as GetResponse, Params as GetParams, action as getAction } from './controllers/get/interfaces';
import { Response as IncrementUrlsCountResponse, Params as IncrementUrlsCountParams, action as incrementUrlsCountAction } from './controllers/incrementUrlsCount/interfaces';
import { Response as DecrementUrlsCountResponse, Params as DecrementUrlsCountParams, action as decrementUrlsCountAction } from './controllers/decrementUrlsCount/interfaces';

export const users = {
  login(broker: ServiceBroker, params: LoginParams): PromiseLike<LoginResponse> {
    return broker.call<LoginResponse, LoginParams>(dotConcat(USERS, loginAction), params);
  },

  get(broker: ServiceBroker, params: GetParams): PromiseLike<GetResponse> {
    return broker.call<GetResponse, GetParams>(dotConcat(USERS, getAction), params);
  },

  incrementUrlsCount(broker: ServiceBroker,
    params: IncrementUrlsCountParams): PromiseLike<IncrementUrlsCountResponse> {
    return broker.call<IncrementUrlsCountResponse, IncrementUrlsCountParams>(
      dotConcat(USERS, incrementUrlsCountAction),
      params,
    );
  },

  decrementUrlsCount(broker: ServiceBroker,
    params: DecrementUrlsCountParams): PromiseLike<DecrementUrlsCountResponse> {
    return broker.call<DecrementUrlsCountResponse, DecrementUrlsCountParams>(
      dotConcat(USERS, decrementUrlsCountAction),
      params,
    );
  },
};
