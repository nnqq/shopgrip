import { Params, Response } from './interfaces';
import { db } from '../../database';

export const handler = async (params: Params): Promise<Response> => {
  const { userId } = params;

  const { nModified } = await db.users.updateOne({ userId }, {
    $inc: {
      urlsCount: -1,
    },
  });

  return {
    updatedUsersCount: nModified,
  };
};
