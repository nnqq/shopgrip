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
      return ctx.reply(`🤔 Что делает бот и зачем он нужен?

С помощью бота ShopGrip ты можешь отслеживать снижение цены на интересующий товар в интернет-магазине. 

Просто отправь ссылку на товар, и бот добавит его в твой список отслеживания. С этого момента, бот будет пристально следить на ценой товара, и как только она уменьшится, заботливо пришлет тебе сообщение об этом

Сейчас бот поддерживает большинство популярных интернет-магазинов России и список постоянно расширяется

🤓 Управление ботом

Переходить по пунктам меню ты можешь с помошью кнопок бота (расположены под полем ввода сообщения). Если кнопок не видно, ты можешь открыть панель нажав на иконку левее клавиши отправки сообщения. Она похожа на газовую плиту с видом сверху 🙂

🤙🏻 Отзывы, пожелания, предложения

Попросить добавить твой любимый интернет-магазин и написать все, что ты думаешь о боте, можно в обсуждении: https://vk.com/topic-187281615_40485265`, null, menuButtons);
    }

    default: {
      return next();
    }
  }
};
