import { db } from '../../database';
import { handler } from './index';

jest.mock('../../database');

describe('Should login user by vkId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Successfully get user from db', async () => {
    const mockUsersFindOne = (db.users.findOne as jest.Mock).mockImplementationOnce(() => ({
      lean() {
        return Promise.resolve({
          userId: 'd6b6b4ae-9afb-49f4-a84f-b00cc5ad5a1c',
        });
      },
    }));

    const expectedResult = {
      userId: 'd6b6b4ae-9afb-49f4-a84f-b00cc5ad5a1c',
    };

    const result = await handler({
      vkId: 123,
    });

    expect(mockUsersFindOne).nthCalledWith(1, {
      vkId: 123,
    }, ['userId']);

    expect(result).toEqual(expectedResult);
  });

  test('Successfully create user if login first time', async () => {
    const mockUsersFindOne = (db.users.findOne as jest.Mock).mockImplementationOnce(() => ({
      lean() {
        return Promise.resolve(null);
      },
    }));

    const mockUsersCreate = db.users.create as jest.Mock;

    mockUsersCreate.mockResolvedValueOnce({
      _id: '5d97ad7e7862b507f84c5813',
      linksCount: 0,
      vkId: 456,
      userId: '6b0d8575-8e20-4b9a-b6a1-41223d6dd211',
      createdAt: ('2019-10-04T23:37:18.480+03:00'),
      updatedAt: ('2019-10-04T23:37:18.480+03:00'),
      __v: 0,
    });

    const expectedResult = {
      userId: '6b0d8575-8e20-4b9a-b6a1-41223d6dd211',
    };

    const result = await handler({
      vkId: 456,
    });

    expect(mockUsersFindOne).nthCalledWith(1, {
      vkId: 456,
    }, ['userId']);

    expect(mockUsersCreate).nthCalledWith(1, {
      vkId: 456,
    });

    expect(result).toEqual(expectedResult);
  });
});
