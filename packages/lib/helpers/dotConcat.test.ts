import { dotConcat } from './dotConcat';

describe('Should concatenate strings with dot separator', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Successfully concat 2 strings', () => {
    const expectedResult = 'abc.de';

    const result = dotConcat('abc', 'de');

    expect(response).toEqual(expectedResult);
  });

  test('Successfully concat 3 strings', () => {
    const expectedResult = 'abc.de.f';

    const result = dotConcat('abc', 'de', 'f');

    expect(response).toEqual(expectedResult);
  });
});
