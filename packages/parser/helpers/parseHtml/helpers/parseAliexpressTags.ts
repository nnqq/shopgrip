import { JSDOM } from 'jsdom';

interface ParseAliexpressTagsResponse {
  title: string;
  price: number;
}

export const parseAliexpressTags = (dom: JSDOM): ParseAliexpressTagsResponse => {
  const title = dom.window.document.querySelector('.product-title').textContent;

  if (!title.length) {
    throw new Error('Название товара в Алиэкспресс пустая строка');
  }

  const price = dom.window.document.querySelector('.product-price-value').textContent;

  const shortTitle = `${title.slice(0, 50)}...`;

  return {
    title: shortTitle,
    price: parseInt(price, 10),
  };
};
