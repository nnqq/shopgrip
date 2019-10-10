import Url from 'url';
import pino from 'pino';
import { isNull } from '../../lib/helpers/isNull';
import { parseLinkAttachment } from '../helpers/parseLinkAttachment';
import { parser } from '../../parser';
import { broker } from '../broker';

const logger = pino();

export const main = async (ctx): Promise<void> => {
  try {
    const message = ctx.message.text.trim().toLowerCase() || parseLinkAttachment(ctx.message);

    const url = Url.parse(message);

    if (isNull(url.host)) {
      return ctx.reply('Это не ссылка 😔 Пожалуйста, отправь ссылку на любой товар в любом интернет-магазине. Если не хочешь сейчас ничего добавлять, нажми на кнопку «🏠 Меню»');
    }


    const { title, vkUrl, price } = await parser.add(broker, {
      userId: ctx.session.userId,
      origUrl: message,
    });

    return ctx.reply({
      message: `✅ Я отправлю тебе сообщение сразу после снижения цены

📦 «${title}»
💸 ${price} руб
🌐 ${vkUrl}`,
      dont_parse_links: true,
    });
  } catch (e) {
    logger.error(e);
    return ctx.reply('Не получилось добавить ссылку 😔 Возможно, данный интернет-магазин пока не поддерживается. Можешь отправить другую, или вернуться в меню нажав кнопку «🏠 Меню»');
  }
};
