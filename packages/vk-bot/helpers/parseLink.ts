import { CtxMessage } from '../interfaces/CtxMessage';
import { parseLinkAttachment } from './parseLinkAttachment';
import { httpPrefix } from './httpPrefix';

export const parseLink = (ctxMessage: CtxMessage): string => {
  const message = ctxMessage.text.trim().toLowerCase() || parseLinkAttachment(ctxMessage);

  const messageWithHttp = httpPrefix(message);

  if (messageWithHttp.includes('m.ru.aliexpress.com')) {
    const messageArr = messageWithHttp.split('://');

    return `${messageArr[0]}://${messageArr[1].slice(2)}`;
  }

  return messageWithHttp;
};
