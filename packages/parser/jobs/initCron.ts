import Agenda from 'agenda';
import { MONGO_URI } from '../constants';
import { priceMonitor } from './priceMonitor';

export const initCron = async (): Promise<void> => {
  const agenda = new Agenda({
    processEvery: '1 minute',
    db: {
      address: MONGO_URI,
    },
  });

  agenda.define('update prices and send notifications', async () => {
    await priceMonitor();
  });

  await agenda.start();

  await agenda.every('15 minutes', 'update prices and send notifications');
};
