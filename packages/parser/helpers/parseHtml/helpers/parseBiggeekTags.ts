import { JSDOM } from 'jsdom';
import { textConcat } from '../../../../lib/helpers/textConcat';
import { textCantAdd } from '../../../../lib/helpers/textCantAdd';
import { textTryAgain } from '../../../../lib/helpers/textTryAgain';
import { ParseTagsResponse } from '../../../interfaces';
import { stringToPrice } from '../../stringToPrice';

export const parseBiggeekTags = (html: string): ParseTagsResponse => {
  const dom = new JSDOM(html);

  const titleRaw = dom.window.document.querySelector('h1').textContent;

  if (!titleRaw.length) {
    throw new Error(textConcat(textCantAdd(), 'Не получилось распознать название товара в Biggeek', textTryAgain()));
  }

  const title = titleRaw.trim();

  const priceString = dom.window.document.querySelector('.product-price').textContent;

  const price = stringToPrice(priceString);

  if (Number.isNaN(price)) {
    throw new Error(textConcat(textCantAdd(), 'Не получилось распознать цену товара в Biggeek', textTryAgain()));
  }

  return {
    title,
    price,
  };
};
