import { broker } from './broker';
import { Response as LoginResponse, Params as LoginParams, action as loginAction } from './controllers/login/interfaces';
import { USERS } from './constants';
import { dotConcat } from '../lib/helpers/dotConcat';

export const users = {
  login(params: LoginParams): PromiseLike<LoginResponse> {
    return broker.call<LoginResponse, LoginParams>(dotConcat(USERS, loginAction), params);
  },
};
