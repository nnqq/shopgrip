import Url from 'url';
import psl from 'psl';
import { Params, Response } from './interfaces';
import { AdmitadApi, GetCampaignsResponse } from '../../helpers/AdmitadApi';
import { ADMITAD_WEBSITEID } from '../../constants';
import { isNull } from '../../../lib/helpers/isNull';
import { isUndefined } from '../../../lib/helpers/isUndefined';
import { isFalse } from '../../../lib/helpers/isFalse';
import { isObject } from '../../../lib/helpers/isObject';

export const handler = async (params: Params): Promise<Response> => {
  const { url, userId } = params;

  const { host } = Url.parse(url);

  if (isNull(host) || isFalse(psl.isValid(host))) {
    throw new Error(`Некорректный URL=${url}`);
  }

  const admitad = new AdmitadApi();

  await admitad.auth();

  const limit = 20;

  const campaignsFirstPage = await admitad.getCampaigns({
    limit,
    offset: 0,
    w_id: ADMITAD_WEBSITEID,
    has_tool: 'deeplink',
    connection_status: 'active',
  });

  const { count } = campaignsFirstPage._meta;

  if (count > limit) {
    const pagesCount = Math.ceil(count / limit);

    const restCampaignsPromises: Array<Promise<GetCampaignsResponse>> = [];

    for (let i = limit; i <= pagesCount; i += 1) {
      restCampaignsPromises.push(admitad.getCampaigns({
        limit,
        offset: limit * i,
        w_id: ADMITAD_WEBSITEID,
        has_tool: 'deeplink',
        connection_status: 'active',
      }));
    }

    const restCampaigns = await Promise.all(restCampaignsPromises);

    restCampaigns.forEach((campaigns) => {
      campaignsFirstPage.results.push(...campaigns.results);
    });
  }

  const parsed = psl.parse(host);

  if (isObject(parsed.error)) {
    throw new Error(`Не получилось распарсить host=${host}`);
  }

  const { domain } = parsed as psl.ParsedDomain;

  const foundCampaign = campaignsFirstPage.results
    .find(({ site_url }) => site_url.includes(domain));

  if (isUndefined(foundCampaign)) {
    return {
      refUrl: null,
    };
  }

  const campaignId = foundCampaign.id;

  return admitad.genDeeplink({
    w_id: ADMITAD_WEBSITEID,
    c_id: campaignId,
    subid: `userId_${userId}`,
    ulp: url,
  });
};
