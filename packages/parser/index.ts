import { ServiceBroker } from 'moleculer';
import { PARSER } from './constants';
import { dotConcat } from '../lib/helpers/dotConcat';
import { Response as AddResponse, Params as AddParams, action as addAction } from './controllers/add/interfaces';
import { Response as DeleteResponse, Params as DeleteParams, action as deleteAction } from './controllers/delete/interfaces';
import { Response as GetResponse, Params as GetParams, action as getAction } from './controllers/get/interfaces';

export const parser = {
  add(broker: ServiceBroker, params: AddParams): PromiseLike<AddResponse> {
    return broker.call<AddResponse, AddParams>(dotConcat(PARSER, addAction), params);
  },

  delete(broker: ServiceBroker, params: DeleteParams): PromiseLike<DeleteResponse> {
    return broker.call<DeleteResponse, DeleteParams>(dotConcat(PARSER, deleteAction), params);
  },

  get(broker: ServiceBroker, params: GetParams): PromiseLike<GetResponse> {
    return broker.call<GetResponse, GetParams>(dotConcat(PARSER, getAction), params);
  },
};
