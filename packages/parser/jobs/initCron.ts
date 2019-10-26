import Agenda from 'agenda';
import { MONGO_URL } from '../constants';
import { priceMonitor } from './priceMonitor';

export const initCron = async (): Promise<void> => {
  const agenda = new Agenda({
    processEvery: '1 minute',
    db: {
      address: MONGO_URL,
    },
  });

  agenda.define('update prices and send notifications', priceMonitor);

  await agenda.start();

  await agenda.every('15 minutes', 'update prices and send notifications');
};
