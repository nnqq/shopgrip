import { Params, Response } from './interfaces';
import { db } from '../../database';

export const handler = async (params: Params): Promise<Response> => {
  const { userId, vkUrl } = params;

  const { deletedCount } = await db.urls.deleteOne({
    userId,
    vkUrl,
  });

  return {
    deletedCount,
  };
};
