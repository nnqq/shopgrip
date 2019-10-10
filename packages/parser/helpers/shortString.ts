export const shortString = (str: string): string => (str.length > 50 ? `${str.slice(0, 50)}...` : str);
