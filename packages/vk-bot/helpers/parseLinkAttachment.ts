import { CtxMessage } from '../interfaces/CtxMessage';

export const parseLinkAttachment = (ctxMessage: CtxMessage): string => {
  if (ctxMessage.attachments && ctxMessage.attachments.length) {
    const [firstLinkAttachment] = ctxMessage.attachments.filter(({ type }) => type === 'link');

    return firstLinkAttachment.link.url.toLowerCase();
  }

  return '';
};
