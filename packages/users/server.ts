import { Context } from 'moleculer';
import { USERS } from './constants';
import { broker } from './broker';
import { Params as LoginParams, Response as LoginResponse, action as loginAction } from './controllers/login/interfaces';
import { handler as loginHandler } from './controllers/login';
import { Response as GetResponse, Params as GetParams, action as getAction } from './controllers/get/interfaces';
import { handler as getHandler } from './controllers/get';
import { Response as IncrementUrlsCountResponse, Params as IncrementUrlsCountParams, action as incrementUrlsCountAction } from './controllers/incrementUrlsCount/interfaces';
import { handler as incrementUrlsCountHandler } from './controllers/incrementUrlsCount';
import { Response as DecrementUrlsCountResponse, Params as DecrementUrlsCountParams, action as decrementUrlsCountAction } from './controllers/decrementUrlsCount/interfaces';
import { handler as decrementUrlsCountHandler } from './controllers/decrementUrlsCount';

broker.createService({
  name: USERS,
  actions: {
    [loginAction](ctx: Context<LoginParams>): Promise<LoginResponse> {
      return loginHandler(ctx.params);
    },

    [getAction](ctx: Context<GetParams>): Promise<GetResponse> {
      return getHandler(ctx.params);
    },

    [incrementUrlsCountAction](ctx: Context<IncrementUrlsCountParams>):
      Promise<IncrementUrlsCountResponse> {
      return incrementUrlsCountHandler(ctx.params);
    },

    [decrementUrlsCountAction](ctx: Context<DecrementUrlsCountParams>):
      Promise<DecrementUrlsCountResponse> {
      return decrementUrlsCountHandler(ctx.params);
    },
  },
});

broker.start();
