import Markup from 'node-vk-bot-api/lib/markup';

export const menuButtons = Markup.keyboard([
  [
    Markup.button('🌐 Мои ссылки', 'primary'),
  ],
  [
    Markup.button('💡 Возможности сервиса', 'primary'),
  ],
  [
    Markup.button('🏠 Меню', 'primary'),
  ],
]);
