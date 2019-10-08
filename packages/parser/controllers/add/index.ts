import fetch from 'node-fetch';
import microdata from 'microdata-node';
import { Params, Response } from './interfaces';
import { db } from '../../database';
import { isUndefined } from '../../../lib/helpers/isUndefined';
import { admitad } from '../../../admitad';
import { broker } from '../../broker';

export const handler = async (params: Params): Promise<any> => {
  const { userId, origUrl } = params;

  const raw = await fetch(origUrl, {
    headers: {
      'user-agent': 'Googlebot/2.1 (+http://www.googlebot.com/bot.html)',
    },
  });

  const html = await raw.text();

  const jsonldArr = microdata.toJsonld(html);

  let title: string;
  let price: number;

  jsonldArr.forEach((item) => {
    const isProduct = item['@type'][0] === 'http://schema.org/Product' || item['@type'][0] === 'https://schema.org/Product';

    const isOffer = item['@type'][0] === 'http://schema.org/Offer' || item['@type'][0] === 'https://schema.org/Offer';

    if (isProduct) {
      let key: string;

      if (item['http://schema.org/name'] && item['http://schema.org/name'].length) {
        key = 'http://schema.org/name';
      } else if (item['https://schema.org/name'] && item['https://schema.org/name'].length) {
        key = 'https://schema.org/name';
      }

      if (isUndefined(key) || !isUndefined(title)) {
        return;
      }

      title = item[key][0]['@value'];
    } else if (isOffer) {
      let key: string;

      if (item['http://schema.org/price'] && item['http://schema.org/price'].length) {
        key = 'http://schema.org/price';
      } else if (item['https://schema.org/price'] && item['https://schema.org/price'].length) {
        key = 'https://schema.org/price';
      }

      if (isUndefined(key) || !isUndefined(price)) {
        return;
      }

      price = +item[key][0]['@value'];
    }
  });

  console.error('title ==>> ', title);

  console.error('price ==>> ', price);

  const { refUrl } = await admitad.getRefUrl(broker, {
    url: origUrl,
  });

  console.error('refUrl ==>> ', refUrl);
};
