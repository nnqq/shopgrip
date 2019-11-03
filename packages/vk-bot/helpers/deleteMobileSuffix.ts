const cutSuffix = (url: string): string => {
  const messageArr = url.split('://');

  return `${messageArr[0]}://${messageArr[1].slice(2)}`;
};

export const deleteMobileSuffix = (url: string): string => {
  if (url.includes('m.ru.aliexpress.com') || url.includes('m.stolplit.ru')) {
    return cutSuffix(url);
  }

  return url;
};
