import Scene from 'node-vk-bot-api/lib/scene';
import { SceneName } from '../interfaces';
import { parser } from '../../../parser';
import { broker } from '../../broker';
import { isUndefined } from '../../../lib/helpers/isUndefined';
import { getUrlsText } from './helpers/getUrlsText';
import { UrlButton } from '../../buttons/urlsButtons/interfaces';
import { urlsButtons } from '../../buttons/urlsButtons';
import { menuButtons } from '../../buttons/menuButtons';
import { MENU_TEXT } from '../../constants';

export const getUrls = new Scene(SceneName.getUrls,
  async (ctx): Promise<void> => {
    ctx.scene.next();

    const { urls } = await parser.get(broker, {
      userId: ctx.session.userId,
      count: 3,
    });

    if (!urls.length) {
      return ctx.reply(`😔 У тебя нет ни одного товара в списке отслеживания. Пожалуйста, вернись в Меню по кнопке (${UrlButton.toMenu}) чтобы добавить какой-нибудь товар`, null, urlsButtons);
    }

    return ctx.reply({
      ...getUrlsText(urls),
      keyboard: urlsButtons,
    });
  },
  async (ctx): Promise<void> => {
    if (isUndefined(ctx.session.getUrlsOffset)) {
      ctx.session.getUrlsOffset = 0;
    }

    const message = ctx.message.text.trim();

    switch (message) {
      case UrlButton.loadMore: {
        ctx.session.getUrlsOffset += 3;

        const { urls } = await parser.get(broker, {
          userId: ctx.session.userId,
          count: 3,
          offset: ctx.session.getUrlsOffset,
        });

        if (!urls.length) {
          return ctx.reply(`😔 Это последняя страница. Пожалуйста, вернись в Меню по кнопке (${UrlButton.toMenu}) чтобы добавить еще какой-нибудь товар`, null, urlsButtons);
        }

        return ctx.reply({
          ...getUrlsText(urls),
          keyboard: urlsButtons,
        });
      }

      case UrlButton.toMenu: {
        ctx.scene.leave();

        ctx.session.getUrlsOffset = 0;

        return ctx.reply(MENU_TEXT, null, menuButtons);
      }

      default: {
        return ctx.reply(`😔 В данном разделе можно только нажимать на кнопки (${UrlButton.loadMore}) или (${UrlButton.toMenu})`, null, urlsButtons);
      }
    }
  });
