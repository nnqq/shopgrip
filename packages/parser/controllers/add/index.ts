import Url from 'url';
import psl, { ParsedDomain } from 'psl';
import { VK } from 'vk-io';
import { Params, Response } from './interfaces';
import { db, UrlLean } from '../../database';
import { admitad } from '../../../admitad';
import { broker } from '../../broker';
import { VK_TOKEN } from '../../constants';
import { parseHtml } from '../../helpers/parseHtml';
import { isNull } from '../../../lib/helpers/isNull';
import { isString } from '../../../lib/helpers/isString';
import { capitalize } from '../../../lib/helpers/capitalize';
import { textCantAdd } from '../../../lib/helpers/textCantAdd';
import { textConcat } from '../../../lib/helpers/textConcat';
import { shortString } from '../../helpers/shortString';

export const handler = async (params: Params): Promise<Response> => {
  const { userId, origUrl } = params;

  const [{ title, price }, { refUrl }, userUrlsCount] = await Promise.all([
    parseHtml(origUrl),
    admitad.getRefUrl(broker, {
      url: origUrl,
      userId,
    }),
    db.urls.countDocuments({ userId }),
  ]);

  const urlToShort = isNull(refUrl) ? origUrl : refUrl;

  if (userUrlsCount >= 500) {
    throw new Error(textConcat(textCantAdd(), 'У тебя в списке уже 500 ссылок - это максимум. Пожалуйста, удали некоторые из них, чтобы добавить новую ссылку'));
  }

  const vk = new VK({
    token: VK_TOKEN,
  });

  const { short_url: vkUrl } = await vk.api.utils.getShortLink({
    url: urlToShort,
  });

  const newDocObj: UrlLean = {
    userId,
    price,
    title: shortString(title),
    shop: capitalize((psl.parse(capitalize(Url.parse(origUrl).host)) as ParsedDomain).sld),
    origUrl,
    vkUrl,
  };

  if (isString(refUrl)) {
    newDocObj.refUrl = refUrl;
  }

  const newDoc = await db.urls.create(newDocObj);

  return {
    title: newDoc.title,
    shop: newDoc.shop,
    price: newDoc.price,
    vkUrl: newDoc.vkUrl,
  };
};
