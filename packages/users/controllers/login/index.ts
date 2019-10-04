import { Params, Response } from './interfaces';
import { db } from '../../database';

export const handler = async (params: Params): Promise<Response> => {
  const { vkId } = params;

  const foundUser = await db.users.findOne({ vkId }, ['userId']).lean();

  if (foundUser) {
    return {
      userId: foundUser.userId,
    };
  }

  const { userId } = await db.users.create({ vkId });

  return {
    userId,
  };
};
