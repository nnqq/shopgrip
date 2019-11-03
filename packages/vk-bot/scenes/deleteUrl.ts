import Scene from 'node-vk-bot-api/lib/scene';
import { SceneName } from './interfaces';
import { parser } from '../../parser';
import { broker } from '../broker';
import { isNull } from '../../lib/helpers/isNull';
import { deleteUrlButtons } from '../buttons/deleteUrlButtons';
import { menuButtons } from '../buttons/menuButtons';
import { DeleteUrlButton } from '../buttons/deleteUrlButtons/interfaces';
import { parseLinkAttachment } from '../helpers/parseLinkAttachment';
import { MENU_TEXT } from '../constants';

export const deleteUrl = new Scene(SceneName.deleteUrl,
  (ctx): void => {
    ctx.scene.next();

    return ctx.reply(`❓ Пожалуйста, отправь ссылку на товар (или его цену), который хочешь удалить из своего списка отслеживания. Если передумал, нажми кнопку (${DeleteUrlButton.toMenu}) чтобы вернуться в Меню`, null, deleteUrlButtons);
  },
  async (ctx): Promise<void> => {
    const message = ctx.message.text.trim() || parseLinkAttachment(ctx.message);

    switch (message) {
      case DeleteUrlButton.toMenu: {
        ctx.scene.leave();

        return ctx.reply(MENU_TEXT, null, menuButtons);
      }

      default: {
        const deletedResponse = await parser.delete(broker, {
          userId: ctx.session.userId,
          origUrlOrVkUrlOrPrice: message,
        });

        if (isNull(deletedResponse)) {
          return ctx.reply(`😔 Не найдено ни одного товара с такой ссылкой/ценой. Если передумал, нажми кнопку (${DeleteUrlButton.toMenu}) чтобы вернуться в Меню`, null, deleteUrlButtons);
        }

        return ctx.reply({
          message: `✅ Я удалил один товар из твоего списка отслеживания 

📍 «${deletedResponse.shop}»
🛒 «${deletedResponse.title}»
💸 ${deletedResponse.price} руб
🌐 ${deletedResponse.vkUrl}

❓ Если хочешь удалить еще другой товар, отправь ссылку/цену. Если нет, нажми кнопку (${DeleteUrlButton.toMenu}) чтобы вернуться в Меню`,
          dont_parse_links: true,
          keyboard: deleteUrlButtons,
        });
      }
    }
  });
