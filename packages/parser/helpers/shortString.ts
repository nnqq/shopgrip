export const shortString = (str: string): string => {
  const trimmed = str.trim();

  return trimmed.length > 50 ? `${trimmed.slice(0, 50)}...` : trimmed;
};
