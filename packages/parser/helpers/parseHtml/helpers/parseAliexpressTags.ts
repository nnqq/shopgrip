import { JSDOM } from 'jsdom';
import { shortString } from '../../shortString';

interface ParseAliexpressTagsResponse {
  title: string;
  price: number;
}

export const parseAliexpressTags = (dom: JSDOM): ParseAliexpressTagsResponse => {
  const title = dom.window.document.querySelector('title').textContent;

  if (!title.length) {
    throw new Error('Название товара в Алиэкспресс пустая строка');
  }

  const ogTitleContent = dom.window.document.head.querySelector('meta[property="og:title"]').getAttribute('content');

  if (!ogTitleContent.length) {
    throw new Error('Цена товара в Алиэкспресс пустая строка');
  }

  return {
    title: shortString(title),
    price: parseInt(ogTitleContent, 10),
  };
};
