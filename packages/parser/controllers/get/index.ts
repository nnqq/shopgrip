import { Params, Response } from './interfaces';
import { db } from '../../database';

export const handler = async (params: Params): Promise<Response> => {
  const { count = 5, offset = 0, userId } = params;

  const [urls, totalCount] = await Promise.all([
    db.urls.find({ userId }, ['-_id', 'shop', 'title', 'price', 'vkUrl'], {
      limit: count,
      skip: offset,
      sort: {
        updatedAt: -1,
      },
    }).lean(),
    db.urls.countDocuments({ userId }),
  ]);

  return {
    count: urls.length,
    offset,
    totalCount,
    urls,
  };
};
