import Url from 'url';
import psl from 'psl';
import fetch from 'node-fetch';
import UserAgent from 'user-agents';
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
import { parseBiggeekTags } from './helpers/parseBiggeekTags';
import { parseSotamarket24Tags } from './helpers/parseSotamarket24Tags';

export interface ParseHtmlResponse {
  title: string;
  price: number;
}

export const parseHtml = async (url: string): Promise<ParseHtmlResponse> => {
  const { host } = Url.parse(url);

  if (isNull(host)) {
    throw new Error(textConcat(textCantAdd(), textNotValidUrl(), textTryAgain()));
  }

  const userAgent = new UserAgent({
    deviceCategory: 'desktop',
  });

  const raw = await fetch(url, {
    headers: {
      'user-agent': userAgent.toString(),
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
      return parseAliexpressTags(html);
    }

    case Domain.dress4car: {
      return parseDress4carTags(html);
    }

    case Domain.zadi: {
      return parseZadiTags(html);
    }

    case Domain.biggeek: {
      return parseBiggeekTags(html);
    }

    case Domain.sotamarket24: {
      return parseSotamarket24Tags(html);
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
        return {
          title: parseTitleTag(html),
          price,
        };
      }

      throw new Error(textConcat(textCantAdd(), 'Не получилось распознать название товара и цену', textTryAgain()));
    }
  }
};
