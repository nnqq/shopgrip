import { isUndefined } from './isUndefined';

describe('Should return is typeof value is undefined', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Successfully return true if it undefined', () => {
    const obj: any = {};

    const expectedResult = true;

    const result = isUndefined(obj.a);

    expect(result).toEqual(expectedResult);
  });

  test('Successfully return false if it not undefined', () => {
    const obj: any = {
      a: 'test',
    };

    const expectedResult = false;

    const result = isUndefined(obj.a);

    expect(result).toEqual(expectedResult);
  });
});
