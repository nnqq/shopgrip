import { Params, Response } from './interfaces';
import { db, UrlLean } from '../../database';

export const handler = async (params: Params): Promise<Response> => {
  const { userId, origOrVkUrl } = params;

  const deletedItem: UrlLean = await db.urls.findOneAndDelete({
    $or: [{
      userId,
      vkUrl: origOrVkUrl,
    }, {
      userId,
      origUrl: origOrVkUrl.toLowerCase(),
    }],
  }, {
    projection: {
      _id: false,
      title: true,
      price: true,
      shop: true,
      vkUrl: true,
    },
  }).lean();

  if (!deletedItem) {
    return null;
  }

  return {
    title: deletedItem.title,
    price: deletedItem.price,
    shop: deletedItem.shop,
    vkUrl: deletedItem.vkUrl,
  };
};
