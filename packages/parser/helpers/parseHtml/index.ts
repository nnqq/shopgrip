import Url from 'url';
import psl from 'psl';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { parseMicrodata } from './helpers/parseMicrodata';
import { isUndefined } from '../../../lib/helpers/isUndefined';
import { parseTitleTag } from './helpers/parseTitleTag';
import { isNull } from '../../../lib/helpers/isNull';
import { Domain } from '../../interfaces';
import { parseAliexpressTags } from './helpers/parseAliexpressTags';
import { textNotValidUrl } from '../../../lib/helpers/textNotValidUrl';
import { textConcat } from '../../../lib/helpers/textConcat';
import { textCantAdd } from '../../../lib/helpers/textCantAdd';
import { textTryAgain } from '../../../lib/helpers/textTryAgain';
import { parseDress4carTags } from './helpers/parseDress4carTags';
import { parseZadiTags } from './helpers/parseZadiTags';

export interface ParseHtmlResponse {
  title: string;
  price: number;
}

export const parseHtml = async (url: string): Promise<ParseHtmlResponse> => {
  const { host } = Url.parse(url);

  if (isNull(host)) {
    throw new Error(textConcat(textCantAdd(), textNotValidUrl(), textTryAgain()));
  }

  const raw = await fetch(url, {
    headers: {
      'user-agent': 'Googlebot/2.1 (+http://www.googlebot.com/bot.html)',
    },
    timeout: 10000,
  });

  const html = await raw.text();

  const parsedHost = psl.parse(host);

  if (!isUndefined(parsedHost.error)) {
    throw new Error(textConcat(textCantAdd(), textNotValidUrl(), textTryAgain()));
  }

  const { domain } = parsedHost as psl.ParsedDomain;

  switch (domain) {
    case Domain.aliexpress: {
      const dom = new JSDOM(html);

      return parseAliexpressTags(dom);
    }

    case Domain.dress4car: {
      const dom = new JSDOM(html);

      return parseDress4carTags(dom);
    }

    case Domain.zadi: {
      const dom = new JSDOM(html);

      return parseZadiTags(dom);
    }

    default: {
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

      throw new Error(textConcat(textCantAdd(), 'Не получилось распознать название товара и цену', textTryAgain()));
    }
  }
};
