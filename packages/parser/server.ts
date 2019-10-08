import { Context } from 'moleculer';
import { handler as addHandler } from './controllers/add';
import { PARSER } from './constants';
import { broker } from './broker';
import { Params as AddParams, Response as AddResponse, action as addAction } from './controllers/add/interfaces';

broker.createService({
  name: PARSER,
  actions: {
    [addAction](ctx: Context<AddParams>): Promise<AddResponse> {
      return addHandler(ctx.params);
    },
  },
});

broker.start();
