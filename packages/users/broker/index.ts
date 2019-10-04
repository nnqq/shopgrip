import { ServiceBroker } from 'moleculer';
import { USERS } from '../constants';

export const broker = new ServiceBroker({
  nodeID: USERS,
  transporter: process.env.NATS_URI,
  requestTimeout: 10000,
});
