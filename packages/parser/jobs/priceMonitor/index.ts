import { VK } from 'vk-io';
import { db } from '../../database';
import { users } from '../../../users';
import { broker } from '../../broker';
import { parseHtml } from '../../helpers/parseHtml';
import { ignoreReject } from './helpers/ignoreReject';
import { isNull } from '../../../lib/helpers/isNull';
import { VK_TOKEN } from '../../constants';

type UserId = string;

type VkId = number;

type BulkUpdateOneOperations = Array<{
  updateOne: {
    filter: {
      urlId: string;
    };
    update: {
      [key: string]: string | number;
    };
  };
}>

interface UrlWithNewPrice {
  userId: string;
  urlId: string;
  title: string;
  price: number;
  shop: string;
  origUrl: string;
  vkUrl: string;
  newPrice: number | null;
}

export const priceMonitor = async (): Promise<void> => {
  const urls = await db.urls.find({}, ['-_id', 'userId', 'urlId', 'title', 'price', 'shop', 'origUrl', 'vkUrl']).lean();

  const setUserIds: Set<UserId> = new Set();

  urls.forEach(({ userId }) => {
    setUserIds.add(userId);
  });

  const urlsWithNewPricePromises: Array<Promise<UrlWithNewPrice>> = urls.map(async ({
    userId, urlId, title, price, shop, origUrl, vkUrl,
  }) => {
    const htmlParsed = await ignoreReject(parseHtml(origUrl));

    const newPrice = isNull(htmlParsed) ? null : htmlParsed.price;

    return {
      userId, urlId, title, price, shop, origUrl, vkUrl, newPrice,
    };
  });

  const [{ users: usersArr }, urlsWithNewPrice] = await Promise.all([
    users.get(broker, {
      projection: ['-_id', 'userId', 'vkId'],
      userIds: [...setUserIds],
    }),
    Promise.all(urlsWithNewPricePromises),
  ]);

  const mapVkId: Map<UserId, VkId> = new Map();

  usersArr.forEach(({ userId, vkId }) => {
    mapVkId.set(userId, vkId);
  });

  const bulkUpdateOneOperations: BulkUpdateOneOperations = [];

  const vk = new VK({
    token: VK_TOKEN,
  });

  const vkNotificationsPromises = [];

  urlsWithNewPrice.forEach(({
    userId, urlId, title, price, shop, vkUrl, newPrice,
  }) => {
    if (!isNull(newPrice) && newPrice < price) {
      bulkUpdateOneOperations.push({
        updateOne: {
          filter: {
            urlId,
          },
          update: {
            price: newPrice,
          },
        },
      });

      vkNotificationsPromises.push(vk.api.messages.send({
        peer_id: mapVkId.get(userId),
        message: `📉 Цена на товар в «${shop}» только что снизилась на ${price - newPrice} руб

📍 «${shop}»
🛒 «${title}»
💰 Старая цена: ${price} руб
💸 Новая цена: ${newPrice} руб
🌐 ${vkUrl}`,
        dont_parse_links: true,
      }));
    }
  });

  const finishPromises: Array<Promise<any>> = [...vkNotificationsPromises];

  if (bulkUpdateOneOperations.length) {
    finishPromises.push(db.urls.bulkWrite(bulkUpdateOneOperations));
  }

  await Promise.all(finishPromises);
};
