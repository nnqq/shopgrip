import Scene from 'node-vk-bot-api/lib/scene';
import { SceneName } from '../interfaces';
import { parser } from '../../../parser';
import { broker } from '../../broker';
import { isUndefined } from '../../../lib/helpers/isUndefined';
import { getUrlsText } from './helpers/getUrlsText';
import { UrlButton } from '../../buttons/urlsButtons/interfaces';
import { menuButtons } from '../../buttons/menuButtons';
import { urlsButtons } from '../../buttons/urlsButtons';

export const getUrls = new Scene(SceneName.getUrls,
  async (ctx): Promise<void> => {
    ctx.scene.next();

    const { urls } = await parser.get(broker, {
      userId: ctx.session.userId,
      count: 3,
    });

    return ctx.reply({
      ...getUrlsText(urls),
      keyboard: urlsButtons,
    });
  },
  async (ctx): Promise<void> => {
    if (isUndefined(ctx.session.getUrlsOffset)) {
      ctx.session.getUrlsOffset = 0;
    }

    const message = ctx.message.text;

    switch (message) {
      case UrlButton.loadMore: {
        ctx.session.getUrlsOffset += 3;

        const { urls } = await parser.get(broker, {
          userId: ctx.session.userId,
          count: 3,
          offset: ctx.session.getUrlsOffset,
        });

        return ctx.reply({
          ...getUrlsText(urls),
          keyboard: urlsButtons,
        });
      }

      case UrlButton.toMenu: {
        ctx.session.getUrlsOffset = 0;

        ctx.scene.leave();

        return ctx.reply('✅ Ты вернулся назад в Меню', null, menuButtons);
      }

      default: {
        return ctx.reply(`😔 В данном разделе можно только нажимать на кнопки (${UrlButton.loadMore} или ${UrlButton.toMenu})`);
      }
    }
  });
