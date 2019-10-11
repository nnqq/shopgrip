import { Params, Response } from './interfaces';
import { db } from '../../database';
import { users } from '../../../users';
import { broker } from '../../broker';

export const handler = async (params: Params): Promise<Response> => {
  const { userId, vkUrl } = params;

  const { deletedCount } = await db.urls.deleteOne({
    userId,
    vkUrl,
  });

  if (deletedCount === 1) {
    await users.decrementUrlsCount(broker, { userId });
  }

  return {
    deletedCount,
  };
};
