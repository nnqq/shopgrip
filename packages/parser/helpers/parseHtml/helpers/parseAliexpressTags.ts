import { JSDOM } from 'jsdom';
import { shortString } from '../../shortString';
import { textConcat } from '../../../../lib/helpers/textConcat';
import { textCantAdd } from '../../../../lib/helpers/textCantAdd';
import { textTryAgain } from '../../../../lib/helpers/textTryAgain';

interface ParseAliexpressTagsResponse {
  title: string;
  price: number;
}

export const parseAliexpressTags = (dom: JSDOM): ParseAliexpressTagsResponse => {
  const title = dom.window.document.querySelector('title').textContent;

  if (!title.length) {
    throw new Error(textConcat(textCantAdd(), 'Не получилось распознать название товара в Алиэкспресс', textTryAgain()));
  }

  const ogTitleContent = dom.window.document.head.querySelector('meta[property="og:title"]').getAttribute('content');

  const price = parseInt(ogTitleContent, 10);

  if (Number.isNaN(price)) {
    throw new Error(textConcat(textCantAdd(), 'Не получилось распознать цену товара в Алиэкспресс', textTryAgain()));
  }

  return {
    title: shortString(title),
    price: parseInt(ogTitleContent, 10),
  };
};
