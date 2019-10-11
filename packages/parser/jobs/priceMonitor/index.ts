import { Promise as bbPromise } from 'bluebird';
import { VK } from 'vk-io';
import { db } from '../../database';
import { users } from '../../../users';
import { broker } from '../../broker';
import { parseHtml, ParseHtmlResponse } from '../../helpers/parseHtml';
import { ignoreReject } from './helpers/ignoreReject';
import { isNull } from '../../../lib/helpers/isNull';
import { VK_TOKEN } from '../../constants';

type UserId = string;

type MapUrls = Map<UserId, {
  urlId: string;
  title: string;
  price: number;
  origUrl: string;
  vkUrl: string;
  vkId?: number;
}>

type SafeParseHtmlResponse = ParseHtmlResponse | null;

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

export const priceMonitor = async (): Promise<void> => {
  const urls = await db.urls.find({}, ['-_id', 'userId', 'urlId', 'title', 'price', 'origUrl', 'vkUrl']);

  const setUserIds: Set<UserId> = new Set();

  const mapUrls: MapUrls = new Map();

  const getTitleAndPricePromises: Array<Promise<SafeParseHtmlResponse>> = [];

  urls.forEach(({
    userId, urlId, title, price, origUrl, vkUrl,
  }) => {
    setUserIds.add(userId);

    mapUrls.set(userId, {
      urlId, title, price, origUrl, vkUrl,
    });

    getTitleAndPricePromises.push(ignoreReject(parseHtml(origUrl)));
  });

  const [{ users: usersArr }, getTitleAndPriceResponses] = await Promise.all([
    users.get(broker, {
      projection: ['-_id', 'userId', 'vkId'],
      userIds: [...setUserIds],
    }),
    bbPromise.map(getTitleAndPricePromises, null, {
      concurrency: 1000,
    }) as unknown as SafeParseHtmlResponse[]]);

  usersArr.forEach(({ userId, vkId }) => {
    if (mapUrls.has(userId)) {
      mapUrls.get(userId).vkId = vkId;
    }
  });

  const bulkUpdateOneOperations: BulkUpdateOneOperations = [];

  const vk = new VK({
    token: VK_TOKEN,
  });

  const vkNotificationsPromises = [];

  let i = 0;
  for (const [, {
    title, price, urlId, vkId, vkUrl,
  }] of mapUrls) {
    if (!isNull(getTitleAndPriceResponses[i])) {
      const { price: newPrice } = getTitleAndPriceResponses[i];

      if (newPrice < price) {
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
          peer_id: vkId,
          message: `📉 Цена на товар только что снизилась на ${price - newPrice} руб

📦 «${title}»
💰 Старая цена: ${price}
💸 Новая цена: ${newPrice}
🌐 ${vkUrl}`,
          dont_parse_links: true,
        }));
      }
    }

    i += 1;
  }

  await Promise.all([
    db.urls.bulkWrite(bulkUpdateOneOperations),
    ...vkNotificationsPromises,
  ]);
};
