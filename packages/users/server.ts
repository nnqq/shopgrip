import { Context } from 'moleculer';
import { USERS } from './constants';
import { broker } from './broker';
import { Params as LoginParams, Response as LoginResponse, action as loginAction } from './controllers/login/interfaces';
import { handler as loginHandler } from './controllers/login';
import { Response as GetResponse, Params as GetParams, action as getAction } from './controllers/get/interfaces';
import { handler as getHandler } from './controllers/get';

broker.createService({
  name: USERS,
  actions: {
    [loginAction](ctx: Context<LoginParams>): Promise<LoginResponse> {
      return loginHandler(ctx.params);
    },

    [getAction](ctx: Context<GetParams>): Promise<GetResponse> {
      return getHandler(ctx.params);
    },
  },
});

broker.start();
