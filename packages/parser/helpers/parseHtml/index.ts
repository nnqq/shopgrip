import Url from 'url';
import psl from 'psl';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { parseMicrodata } from './helpers/parseMicrodata';
import { isUndefined } from '../../../lib/helpers/isUndefined';
import { parseTitleTag } from './helpers/parseTitleTag';
import { isNull } from '../../../lib/helpers/isNull';
import { ALIEXPRESS_DOMAIN } from '../../constants';
import { parseAliexpressTags } from './helpers/parseAliexpressTags';

interface ParseHtmlResponse {
  title: string;
  price: number;
}

export const parseHtml = async (url: string): Promise<ParseHtmlResponse> => {
  const { host } = Url.parse(url);

  if (isNull(host)) {
    throw new Error(`Невалидный URL=${url}`);
  }

  const raw = await fetch(url, {
    headers: {
      'user-agent': 'Googlebot/2.1 (+http://www.googlebot.com/bot.html)',
    },
  });

  const html = await raw.text();

  const { title, price } = parseMicrodata(html);

  if (!isUndefined(title) && !isUndefined(price)) {
    return {
      title,
      price,
    };
  }

  if (!isUndefined(price)) {
    const dom = new JSDOM(html);

    return {
      title: parseTitleTag(dom),
      price,
    };
  }

  const parsedHost = psl.parse(host);

  if (!isUndefined(parsedHost.error)) {
    throw new Error(`Ошибка парсинга host=${host}`);
  }

  const { domain } = parsedHost as psl.ParsedDomain;

  if (domain === ALIEXPRESS_DOMAIN) {
    const dom = new JSDOM(html);

    return parseAliexpressTags(dom);
  }

  throw new Error(`Не смогли распознать title и price у url=${url}`);
};
