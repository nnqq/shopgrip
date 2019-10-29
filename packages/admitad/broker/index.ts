import { ServiceBroker } from 'moleculer';

export const broker = new ServiceBroker({
  namespace: process.env.NODE_ENV || 'production',
  transporter: process.env.NATS_URL,
  requestTimeout: 60000,
});
