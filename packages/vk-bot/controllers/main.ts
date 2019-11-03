import Url from 'url';
import pino from 'pino';
import { isNull } from '../../lib/helpers/isNull';
import { parser } from '../../parser';
import { broker } from '../broker';
import { textConcat } from '../../lib/helpers/textConcat';
import { textCantAdd } from '../../lib/helpers/textCantAdd';
import { textTryAgain } from '../../lib/helpers/textTryAgain';
import { NODE_ENV } from '../constants';
import { menuButtons } from '../buttons/menuButtons';
import { parseLink } from '../helpers/parseLink';

const logger = pino({
  prettyPrint: NODE_ENV === 'development',
});

export const main = async (ctx): Promise<void> => {
  try {
    const messageWithHttp = parseLink(ctx.message);

    const url = Url.parse(messageWithHttp);

    if (isNull(url.host)) {
      return ctx.reply('😔 Это не ссылка. Пожалуйста, отправь ссылку на товар в любом интернет-магазине', null, menuButtons);
    }

    const {
      title, vkUrl, price, shop,
    } = await parser.add(broker, {
      userId: ctx.session.userId,
      origUrl: messageWithHttp,
    });

    return ctx.reply({
      message: `✅ Я отправлю тебе сообщение сразу после снижения цены

📍 «${shop}»
🛒 «${title}»
💸 ${price} руб
🌐 ${vkUrl}`,
      dont_parse_links: true,
      keyboard: menuButtons,
    });
  } catch (e) {
    logger.error(e);

    if (e.message.includes('😔')) {
      return ctx.reply(e.message, null, menuButtons);
    }

    return ctx.reply(textConcat(textCantAdd(), 'Произошла ошибка', textTryAgain()), null, menuButtons);
  }
};
