import { Params, Response } from './interfaces';
import { db } from '../../database';
import { isUndefined } from '../../../lib/helpers/isUndefined';

interface Query {
  userId?: {
    $in: string[];
  };
}

export const handler = async (params: Params): Promise<Response> => {
  const { projection, userIds } = params;

  const query: Query = {};

  if (!isUndefined(userIds)) {
    query.userId = {
      $in: userIds,
    };
  }

  const users = await db.users.find(query, projection).lean();

  return {
    users,
  };
};
