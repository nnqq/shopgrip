import { ServiceBroker } from 'moleculer';
import { Response as AddResponse, Params as AddParams, action as addAction } from './controllers/add/interfaces';
import { PARSER } from './constants';
import { dotConcat } from '../lib/helpers/dotConcat';

export const parser = {
  add(broker: ServiceBroker, params: AddParams): PromiseLike<AddResponse> {
    return broker.call<AddResponse, AddParams>(dotConcat(PARSER, addAction), params);
  },
};
