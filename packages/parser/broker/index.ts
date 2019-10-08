import { ServiceBroker } from 'moleculer';

export const broker = new ServiceBroker({
  namespace: process.env.NODE_ENV,
  transporter: process.env.NATS_URI,
  requestTimeout: 10000,
});
