import { Context } from 'moleculer';
import { handler as getRefUrlHandler } from './controllers/getRefUrl';
import { ADMITAD } from './constants';
import { broker } from './broker';
import { Params as GetRefUrlParams, Response as GetRefUrlResponse, action as getRefUrlAction } from './controllers/getRefUrl/interfaces';

broker.createService({
  name: ADMITAD,
  actions: {
    [getRefUrlAction](ctx: Context<GetRefUrlParams>): Promise<GetRefUrlResponse> {
      return getRefUrlHandler(ctx.params);
    },
  },
});

broker.start();
