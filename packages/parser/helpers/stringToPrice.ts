export const stringToPrice = (str: string): number => parseInt(str.trim().replace(/[^\d.,]*/g, ''), 10);
