import { CtxMessage } from '../interfaces/CtxMessage';
import { parseLinkAttachment } from './parseLinkAttachment';
import { httpPrefix } from './httpPrefix';
import { deleteMobileSuffix } from './deleteMobileSuffix';

export const parseLink = (ctxMessage: CtxMessage): string => {
  const message = ctxMessage.text.trim().toLowerCase() || parseLinkAttachment(ctxMessage);

  const messageWithHttp = httpPrefix(message);

  return deleteMobileSuffix(messageWithHttp);
};
