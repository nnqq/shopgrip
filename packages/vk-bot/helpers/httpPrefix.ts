export const httpPrefix = (str: string): string => {
  const isStartsWithHttp = str.startsWith('http://') || str.startsWith('https://');

  return isStartsWithHttp ? str : `http://${str}`;
};
