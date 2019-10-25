import Logger from 'pino';

const logger = Logger();

export const ignoreReject = async <T> (promise: Promise<T>): Promise<T | null> => {
  try {
    const result = await promise;

    return result;
  } catch (e) {
    logger.error(e);
    return null;
  }
};
