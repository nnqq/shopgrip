import { JSDOM } from 'jsdom';
import { textConcat } from '../../../../lib/helpers/textConcat';
import { textCantAdd } from '../../../../lib/helpers/textCantAdd';
import { textTryAgain } from '../../../../lib/helpers/textTryAgain';
import { ParseTagsResponse } from '../../../interfaces';
import { stringToPrice } from '../../stringToPrice';

export const parseZadiTags = (dom: JSDOM): ParseTagsResponse => {
  const title = dom.window.document.querySelector('h1').textContent;

  if (!title.length) {
    throw new Error(textConcat(textCantAdd(), 'Не получилось распознать название товара в Zadi', textTryAgain()));
  }

  const priceString = dom.window.document.querySelector('.text-18.text-bold.price').children[1].textContent;

  const price = stringToPrice(priceString);

  if (Number.isNaN(price)) {
    throw new Error(textConcat(textCantAdd(), 'Не получилось распознать цену товара в Zadi', textTryAgain()));
  }

  return {
    title,
    price,
  };
};
