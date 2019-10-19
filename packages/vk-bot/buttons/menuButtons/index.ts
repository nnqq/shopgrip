import Markup from 'node-vk-bot-api/lib/markup';
import { MenuButton } from './interfaces';

export const menuButtons = Markup.keyboard([
  [
    Markup.button(MenuButton.addUrl, 'positive'),
    Markup.button(MenuButton.deleteUrl, 'negative'),
  ],
  [
    Markup.button(MenuButton.getUrls, 'primary'),
  ],
  [
    Markup.button(MenuButton.getTips, 'secondary'),
  ],
]);
