import { Context } from 'moleculer';
import { handler as loginHandler } from './controllers/login';
import { USERS } from './constants';
import { broker } from './broker';
import { Params as LoginParams, Response as LoginResponse, action as loginAction } from './controllers/login/interfaces';

broker.createService({
  name: USERS,
  actions: {
    [loginAction](ctx: Context<LoginParams>): Promise<LoginResponse> {
      return loginHandler(ctx.params);
    },
  },
});

broker.start();
