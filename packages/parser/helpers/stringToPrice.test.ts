import { stringToPrice } from './stringToPrice';

describe('Should convert string with price to price number', () => {
  test('Successfully convert string " 1000,00  руб "', () => {
    const expectedResult = 1000;

    const result = stringToPrice(' 1000,00  руб ');

    expect(result).toEqual(expectedResult);
  });

  test('Successfully convert string "1000,00  руб"', () => {
    const expectedResult = 1000;

    const result = stringToPrice('1000,00  руб');

    expect(result).toEqual(expectedResult);
  });

  test('Successfully convert string "1000,00 руб"', () => {
    const expectedResult = 1000;

    const result = stringToPrice('1000,00 руб');

    expect(result).toEqual(expectedResult);
  });

  test('Successfully convert string " 100.000 Р"', () => {
    const expectedResult = 100;

    const result = stringToPrice(' 100.000 Р');

    expect(result).toEqual(expectedResult);
  });

  test('Successfully convert string "от 1000,00  руб "', () => {
    const expectedResult = 1000;

    const result = stringToPrice('от 1000,00  руб ');

    expect(result).toEqual(expectedResult);
  });
});
