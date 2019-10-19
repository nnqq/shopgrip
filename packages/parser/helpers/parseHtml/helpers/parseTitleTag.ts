import { JSDOM } from 'jsdom';

export const parseTitleTag = (dom: JSDOM): string => dom.window.document.querySelector('title').textContent;
