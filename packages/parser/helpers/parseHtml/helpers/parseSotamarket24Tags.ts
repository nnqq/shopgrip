import { JSDOM } from 'jsdom';
import { textConcat } from '../../../../lib/helpers/textConcat';
import { textCantAdd } from '../../../../lib/helpers/textCantAdd';
import { textTryAgain } from '../../../../lib/helpers/textTryAgain';
import { ParseTagsResponse } from '../../../interfaces';
import { stringToPrice } from '../../stringToPrice';

export const parseSotamarket24Tags = (html: string): ParseTagsResponse => {
  const dom = new JSDOM(html);

  const title = dom.window.document.querySelector('h1').textContent;

  if (!title.length) {
    throw new Error(textConcat(textCantAdd(), 'Не получилось распознать название товара в Sotamarket24', textTryAgain()));
  }

  const priceString = dom.window.document.querySelector('.uc-price').textContent;

  const price = stringToPrice(priceString);

  if (Number.isNaN(price)) {
    throw new Error(textConcat(textCantAdd(), 'Не получилось распознать цену товара в Sotamarket24', textTryAgain()));
  }

  return {
    title,
    price,
  };
};
