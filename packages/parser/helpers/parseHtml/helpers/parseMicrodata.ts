import microdata from 'microdata-node';
import { isUndefined } from '../../../../lib/helpers/isUndefined';

interface ParseMicrodataResponse {
  title?: string;
  price?: number;
}

export const parseMicrodata = (html: string): ParseMicrodataResponse => {
  const jsonldArr = microdata.toJsonld(html);

  const response: ParseMicrodataResponse = {};

  for (const item of jsonldArr) {
    if (!isUndefined(response.title) && !isUndefined(response.price)) {
      return response;
    }

    const isProduct = item['@type'][0] === 'http://schema.org/Product' || item['@type'][0] === 'https://schema.org/Product';

    const isOffer = item['@type'][0] === 'http://schema.org/Offer' || item['@type'][0] === 'https://schema.org/Offer';

    if (isProduct) {
      let key: string;

      if (item['http://schema.org/name'] && item['http://schema.org/name'].length) {
        key = 'http://schema.org/name';
      } else if (item['https://schema.org/name'] && item['https://schema.org/name'].length) {
        key = 'https://schema.org/name';
      }

      if (isUndefined(key)) {
        continue;
      }

      response.title = item[key][0]['@value'];
    } else if (isOffer) {
      let key: string;

      if (item['http://schema.org/price'] && item['http://schema.org/price'].length) {
        key = 'http://schema.org/price';
      } else if (item['https://schema.org/price'] && item['https://schema.org/price'].length) {
        key = 'https://schema.org/price';
      }

      if (isUndefined(key)) {
        continue;
      }

      response.price = +item[key][0]['@value'];
    }
  }

  return response;
};
