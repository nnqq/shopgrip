import { JSDOM } from 'jsdom';

export const parseTitleTag = (html: string): string => {
  const dom = new JSDOM(html);

  return dom.window.document.querySelector('title').textContent;
};
