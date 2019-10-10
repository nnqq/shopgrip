import { isUndefined } from '../../lib/helpers/isUndefined';
import { users } from '../../users';
import { broker } from '../broker';

export const auth = async (ctx, next): Promise<void> => {
  if (isUndefined(ctx.session.userId)) {
    const vkId = ctx.message.peer_id;

    const { userId } = await users.login(broker, { vkId });

    ctx.session.userId = userId;
  }

  next();
};
