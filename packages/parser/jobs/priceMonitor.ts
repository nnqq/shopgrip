import { Promise as bbPromise } from 'bluebird';
import { db } from '../database';

export const priceMonitor = async () => {
  const urls = await db.urls.find({}, ['-_id', 'userId', 'urlId', 'price', 'origUrl']);

  const setUserIds: Set<string> = new Set();

  urls.forEach(({}))
};
