import { JSDOM } from 'jsdom';

export const parseTitleTag = (domInstance: JSDOM): string => domInstance
  .window.document.querySelector('title').textContent;
