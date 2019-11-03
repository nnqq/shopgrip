import { Params, Response } from './interfaces';
import { db, UrlLean } from '../../database';

export const handler = async (params: Params): Promise<Response> => {
  const { userId, origUrlOrVkUrlOrPrice } = params;

  const deletedItem: UrlLean = await db.urls.findOneAndDelete({
    $or: [{
      userId,
      vkUrl: origUrlOrVkUrlOrPrice,
    }, {
      userId,
      origUrl: origUrlOrVkUrlOrPrice,
    }, {
      userId,
      price: parseInt(origUrlOrVkUrlOrPrice, 10),
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
