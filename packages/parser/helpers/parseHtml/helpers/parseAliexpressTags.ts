import { JSDOM } from 'jsdom';
import { textConcat } from '../../../../lib/helpers/textConcat';
import { textCantAdd } from '../../../../lib/helpers/textCantAdd';
import { textTryAgain } from '../../../../lib/helpers/textTryAgain';
import { ParseTagsResponse } from '../../../interfaces';
import { isNull } from '../../../../lib/helpers/isNull';
import { stringToPrice } from '../../stringToPrice';

export const parseAliexpressTags = (html: string): ParseTagsResponse => {
  const dom = new JSDOM(html);

  const title = dom.window.document.querySelector('title').textContent;

  if (!title.length) {
    throw new Error(textConcat(textCantAdd(), 'Не получилось распознать название товара в Алиэкспресс', textTryAgain()));
  }

  const trimmedTitle = title.trim();

  const ogTitleContent = dom.window.document.head.querySelector('meta[property="og:title"]').getAttribute('content').trim();

  const price = stringToPrice(ogTitleContent);

  if (Number.isNaN(price)) {
    // Parse price https://m.ru.aliexpress.com
    const elemMobilePrice = dom.window.document.querySelector('input[type=hidden][name=minPrice]');

    if (isNull(elemMobilePrice)) {
      // Parse price https://tmall.aliexpress.com
      const elemTmallPrice = dom.window.document.querySelector('input[type=hidden][id=sku-price-store]');

      if (isNull(elemTmallPrice)) {
        throw new Error(textConcat(textCantAdd(), 'Не получилось распознать цену товара в Алиэкспресс', textTryAgain()));
      }

      const tmallPrice = elemTmallPrice.getAttribute('value').trim();

      return {
        title: trimmedTitle,
        price: stringToPrice(tmallPrice),
      };
    }

    const mobilePrice = elemMobilePrice.getAttribute('value').trim();

    return {
      title: trimmedTitle,
      price: stringToPrice(mobilePrice),
    };
  }

  return {
    title: trimmedTitle,
    price,
  };
};
