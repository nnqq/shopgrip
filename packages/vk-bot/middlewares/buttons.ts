import { MenuButton } from '../buttons/menuButtons/interfaces';
import { SceneName } from '../scenes/interfaces';
import { menuButtons } from '../buttons/menuButtons';

export const buttons = async (ctx, next): Promise<void> => {
  const message = ctx.message.text.trim();

  switch (message) {
    case MenuButton.addUrl: {
      return ctx.reply('❓ Пожалуйста, отправь ссылку на товар в любом интернет-магазине, чтобы добавить в его в список отслеживания. Как только цена этого товара снизится, я отправлю тебе сообщение', null, menuButtons);
    }

    case MenuButton.deleteUrl: {
      return ctx.scene.enter(SceneName.deleteUrl);
    }

    case MenuButton.getUrls: {
      return ctx.scene.enter(SceneName.getUrls);
    }

    case MenuButton.getTips: {
      return ctx.reply('Советы по работе с ботом', null, menuButtons);
    }

    default: {
      return next();
    }
  }
};
