import Markup from 'node-vk-bot-api/lib/markup';
import { DeleteUrlButton } from './interfaces';

export const deleteUrlButtons = Markup.keyboard([
  [
    Markup.button(DeleteUrlButton.toMenu, 'primary'),
  ],
]);
