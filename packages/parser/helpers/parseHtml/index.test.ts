import { parseHtml } from './index';

describe('(integration test) Should parse title and price from url', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Successfully parse zadi.ru', () => {
    test('Parse knife title+price', async () => {
      const exprectedResult = {
        title: 'Устройство для заточки сменных ножей  модельного резца арт. 16-325',
        price: 620,
      };

      const result = await parseHtml('http://www.zadi.ru/ustroystvo-dlya-zatochki-smennyh-nozhey-modelnogo-rezca-ivan-art-8118-00');

      expect(result).toEqual(exprectedResult);
    });

    test('Parse belt title+price', async () => {
      const exprectedResult = {
        title: 'Заготовка для ремня (красно-коричневый) 42мм (3-3,3мм) арт.K3516',
        price: 370,
      };

      const result = await parseHtml('http://www.zadi.ru/zagotovka-dlya-remnya-krasno-korichnevyy-38mm-3-33mm-artk3514');

      expect(result).toEqual(exprectedResult);
    });
  });

  describe('Successfully parse biggeek.ru', () => {
    test('Parse iphone title+price', async () => {
      const exprectedResult = {
        title: 'Apple iPhone 11 Pro Max 256GB Gold',
        price: 97990,
      };

      const result = await parseHtml('https://biggeek.ru/products/apple-iphone-11-pro-max-256gb-gold');

      expect(result).toEqual(exprectedResult);
    });

    test('Parse xiaomi title+price', async () => {
      const exprectedResult = {
        title: 'Смартфон Xiaomi Redmi Note 7 3/32Gb Черный / Black',
        price: 12990,
      };

      const result = await parseHtml('https://biggeek.ru/products/smartfon-xiaomi-redmi-note-7-3-32gb-chernyj-black');

      expect(result).toEqual(exprectedResult);
    });
  });
});
