import { Response as UrlsResponse } from '../../../../parser/controllers/get/interfaces';

type Params = UrlsResponse['urls'] | [];

interface Response {
  message: string;
  dont_parse_links: true;
}

export const getUrlsText = (urls: Params): Response => {
  let message = '';

  urls.forEach(({
    shop, title, price, vkUrl,
  }) => {
    message += `

📍 «${shop}»
🛒 «${title}»
💸 ${price} руб
🌐 ${vkUrl}`;
  });

  return {
    message,
    dont_parse_links: true,
  };
};
