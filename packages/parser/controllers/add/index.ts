import { VK } from 'vk-io';
import { Params, Response } from './interfaces';
import { db, UrlLean } from '../../database';
import { admitad } from '../../../admitad';
import { broker } from '../../broker';
import { VK_TOKEN } from '../../constants';
import { parseHtml } from '../../helpers/parseHtml';
import { isNull } from '../../../lib/helpers/isNull';
import { isString } from '../../../lib/helpers/isString';
import { users } from '../../../users';

export const handler = async (params: Params): Promise<Response> => {
  const { userId, origUrl } = params;

  const [{ title, price }, { refUrl }] = await Promise.all([
    parseHtml(origUrl),
    admitad.getRefUrl(broker, {
      url: origUrl,
      userId,
    })]);

  const urlToShort = isNull(refUrl) ? origUrl : refUrl;

  const vk = new VK({
    token: VK_TOKEN,
  });

  const { short_url: vkUrl } = await vk.api.utils.getShortLink({
    url: urlToShort,
  });

  const newDocObj: UrlLean = {
    userId,
    price,
    title,
    origUrl,
    vkUrl,
  };

  if (isString(refUrl)) {
    newDocObj.refUrl = refUrl;
  }

  const newDoc = await db.urls.create(newDocObj);

  await users.incrementUrlsCount(broker, { userId });

  return {
    title: newDoc.title,
    price: newDoc.price,
    vkUrl: newDoc.vkUrl,
  };
};
