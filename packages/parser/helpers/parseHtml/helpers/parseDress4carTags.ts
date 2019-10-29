import { JSDOM } from 'jsdom';
import { textConcat } from '../../../../lib/helpers/textConcat';
import { textCantAdd } from '../../../../lib/helpers/textCantAdd';
import { textTryAgain } from '../../../../lib/helpers/textTryAgain';
import { ParseTagsResponse } from '../../../interfaces';

export const parseDress4carTags = (dom: JSDOM): ParseTagsResponse => {
  const title = dom.window.document.querySelector('h1').textContent;

  if (!title.length) {
    throw new Error(textConcat(textCantAdd(), 'Не получилось распознать название товара в Dress4car', textTryAgain()));
  }

  // "4 500 ₽"
  const priceString = dom.window.document.querySelector('.autocalc-product-price').textContent;

  const priceWithoutSpaces = priceString.trim().split(' ').join('');

  const price = parseInt(priceWithoutSpaces, 10);

  if (Number.isNaN(price)) {
    throw new Error(textConcat(textCantAdd(), 'Не получилось распознать цену товара в Dress4car', textTryAgain()));
  }

  return {
    title,
    price,
  };
};
