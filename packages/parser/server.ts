import { Context } from 'moleculer';
import { PARSER } from './constants';
import { broker } from './broker';
import { initCron } from './jobs/initCron';
import { Params as AddParams, Response as AddResponse, action as addAction } from './controllers/add/interfaces';
import { handler as addHandler } from './controllers/add';
import { Params as DeleteParams, Response as DeleteResponse, action as deleteAction } from './controllers/delete/interfaces';
import { handler as deleteHandler } from './controllers/delete';
import { Params as GetParams, Response as GetResponse, action as getAction } from './controllers/get/interfaces';
import { handler as getHandler } from './controllers/get';

broker.createService({
  name: PARSER,
  actions: {
    [addAction](ctx: Context<AddParams>): Promise<AddResponse> {
      return addHandler(ctx.params);
    },

    [deleteAction](ctx: Context<DeleteParams>): Promise<DeleteResponse> {
      return deleteHandler(ctx.params);
    },

    [getAction](ctx: Context<GetParams>): Promise<GetResponse> {
      return getHandler(ctx.params);
    },
  },
});

(async (): Promise<void> => {
  try {
    await broker.start();

    await initCron();
  } catch (e) {
    process.exit(1);
  }
})();
