import { JSDOM } from 'jsdom';
import { shortString } from '../../shortString';

export const parseTitleTag = (dom: JSDOM): string => {
  const title = dom.window.document.querySelector('title').textContent;

  return shortString(title);
};
