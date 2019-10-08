import Url from 'url';
import { isNull } from '../../lib/helpers/isNull';
import { parseLinkAttachment } from '../helpers/parseLinkAttachment';
import { parser } from '../../parser';
import { broker } from '../broker';

export const main = async (ctx): Promise<void> => {
  const message = ctx.message.text.trim().toLowerCase() || parseLinkAttachment(ctx.message);

  const url = Url.parse(message);

  if (isNull(url.host)) {
    return ctx.reply('Это не ссылка :( Пожалуйста, отправь ссылку на любой товар в любом интернет-магазине. Если не хочешь сейчас ничего добавлять, нажми на кнопку «🏠 Меню»');
  }

  try {
    await parser.add(broker, {
      userId: ctx.session.userId,
      origUrl: message,
    });
  } catch (e) {
    console.error(e);
    return ctx.reply(e.message);
  }

  return ctx.reply('✅ Ок. Я отправлю тебе сообщение сразу как цена на данный товар уменьшится');
};
