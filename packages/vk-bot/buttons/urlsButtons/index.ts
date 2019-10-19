import Markup from 'node-vk-bot-api/lib/markup';
import { UrlButton } from './interfaces';

export const urlsButtons = Markup.keyboard([
  [
    Markup.button(UrlButton.loadMore, 'positive'),
  ],
  [
    Markup.button(UrlButton.toMenu, 'primary'),
  ],
]);
