import fetch from 'node-fetch';
import { stringify } from 'querystring';
import Url, { URLSearchParams } from 'url';
import { isNull } from '../../lib/helpers/isNull';
import { ADMITAD_CLIENTID, ADMITAD_AUTH_BASE64 } from '../constants';
import {textNotValidUrl} from "../../lib/helpers/textNotValidUrl";
import {textConcat} from "../../lib/helpers/textConcat";
import {textCantAdd} from "../../lib/helpers/textCantAdd";
import {textTryAgain} from "../../lib/helpers/textTryAgain";

interface AdmitadAuthResponse {
  username: string;
  first_name: string;
  last_name: string;
  group: string;
  language: string;
  access_token: string;
  expires_in: number;
  token_type: string;
  code: string;
  scope: string;
  id: number;
  refresh_token: string;
}

type StrOrNull = string | null;

type Status = 'active' | 'pending' | 'declined';

interface GenDeeplink {
  w_id: string;
  c_id: number;
  subid: string;
  ulp: string;
}

interface GenDeeplinkResponse {
  refUrl: string;
}

interface GetCampaigns {
  limit: number;
  offset: number;
  w_id: string;
  connection_status: Status;
  has_tool: 'deeplink' | 'products' | 'retag' | 'postview' | 'lost_orders' | 'broker_traffic';
}

interface Action {
  hold_time: number;
  payment_size: string;
  type: string;
  name: string;
  id: number;
}

interface Region {
  region: string;
}

interface Rate {
  price_s: string;
  tariff_id: number;
  country?: StrOrNull;
  date_s: string;
  is_percentage: boolean;
  id: number;
  size: string;
}

interface Tariff {
  action_id: number;
  rates: Rate[];
  id: number;
  name: string;
}

interface ActionsDetail {
  hold_size: number;
  tariffs: Tariff[];
  type: string;
  name: string;
  id: number;
}

interface Traffic {
  enabled: boolean;
  name: string;
  id: number;
}

interface Parent {
  language: string;
  id: number;
  parent?: StrOrNull;
  name: string;
}

interface Category {
  language: string;
  id: number;
  parent: Parent;
  name: string;
}

interface FeedsInfo {
  advertiser_last_update: string;
  admitad_last_update: string;
  csv_link: string;
  name: string;
  xml_link: string;
}

export interface Campaign {
  goto_cookie_lifetime: number;
  rating: string;
  exclusive: boolean;
  mobile_os_type?: StrOrNull;
  image: string;
  actions: Action[];
  retag: boolean;
  currency: string;
  activation_date: Date;
  actions_limit?: StrOrNull;
  cr: number;
  ecpc: number;
  id: number;
  allow_actions_all_countries: boolean;
  avg_hold_time: number;
  connection_status: string;
  gotolink: string;
  mobile_device_type?: StrOrNull;
  site_url: string;
  regions: Region[];
  actions_detail: ActionsDetail[];
  epc_trend: string;
  geotargeting: boolean;
  raw_description: string;
  products_xml_link: string;
  status: string;
  coupon_iframe_denied: boolean;
  traffics: Traffic[];
  description: string;
  cr_trend: string;
  mobile_os?: StrOrNull;
  modified_date: Date;
  denynewwms: boolean;
  action_countries: string[];
  moderation: boolean;
  action_testing_limit?: StrOrNull;
  max_hold_time?: StrOrNull;
  categories: Category[];
  name: string;
  avg_money_transfer_time: number;
  products_csv_link: string;
  feeds_info: FeedsInfo[];
  actions_limit_24?: StrOrNull;
  landing_code?: StrOrNull;
  ecpc_trend: string;
  landing_title?: StrOrNull;
  epc: number;
  allow_deeplink: boolean;
  show_products_links: boolean;
}

export interface GetCampaignsResponse {
  results: Campaign[];
  _meta: {
    count: number;
    limit: number;
    offset: number;
  };
}

export class AdmitadApi {
  private token: string;

  constructor() {
    this.token = '';
  }

  public async auth(): Promise<void> {
    const raw = await fetch('https://api.admitad.com/token/', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${ADMITAD_AUTH_BASE64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: ADMITAD_CLIENTID,
        scope: 'public_data advcampaigns advcampaigns_for_website validate_links deeplink_generator websites',
        grant_type: 'client_credentials',
      }),
    });

    const { access_token }: AdmitadAuthResponse = await raw.json();

    this.token = access_token;
  }

  public async genDeeplink({
    w_id, c_id, subid, ulp,
  }: GenDeeplink): Promise<GenDeeplinkResponse> {
    const qs = stringify({
      subid,
      ulp,
    });

    const raw = await fetch(`https://api.admitad.com/deeplink/${w_id}/advcampaign/${c_id}/?${qs}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    const [admitadResponse]: string = await raw.json();

    const { host } = Url.parse(admitadResponse);

    if (isNull(host)) {
      throw new Error(textConcat(textCantAdd(), textNotValidUrl(), textTryAgain()));
    }

    return {
      refUrl: admitadResponse,
    };
  }

  public async getCampaigns({
    limit, offset, w_id, connection_status, has_tool,
  }: GetCampaigns): Promise<GetCampaignsResponse> {
    const qs = stringify({
      limit,
      offset,
      connection_status,
      has_tool,
    });

    const raw = await fetch(`https://api.admitad.com/advcampaigns/website/${w_id}/?${qs}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return raw.json();
  }
}
