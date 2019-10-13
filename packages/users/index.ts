import { ServiceBroker } from 'moleculer';
import { USERS } from './constants';
import { dotConcat } from '../lib/helpers/dotConcat';
import { Response as LoginResponse, Params as LoginParams, action as loginAction } from './controllers/login/interfaces';
import { Response as GetResponse, Params as GetParams, action as getAction } from './controllers/get/interfaces';

export const users = {
  login(broker: ServiceBroker, params: LoginParams): PromiseLike<LoginResponse> {
    return broker.call<LoginResponse, LoginParams>(dotConcat(USERS, loginAction), params);
  },

  get(broker: ServiceBroker, params: GetParams): PromiseLike<GetResponse> {
    return broker.call<GetResponse, GetParams>(dotConcat(USERS, getAction), params);
  },
};
