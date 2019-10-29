import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { parseZadiTags } from './parseZadiTags';

describe('Should parse title and price from zadi.ru', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('(integration test) Successfully parse zadi.ru', async () => {
    const [rawKnife620, rawBelt370] = await Promise.all([
      fetch('http://www.zadi.ru/ustroystvo-dlya-zatochki-smennyh-nozhey-modelnogo-rezca-ivan-art-8118-00'),
      fetch('http://www.zadi.ru/zagotovka-dlya-remnya-krasno-korichnevyy-38mm-3-33mm-artk3514'),
    ]);

    const [htmlKnife620, htmlBelt370] = await Promise.all([
      rawKnife620.text(),
      rawBelt370.text(),
    ]);

    const domKnife620 = new JSDOM(htmlKnife620);

    const domBelt370 = new JSDOM(htmlBelt370);

    const expectedResultOne = {
      title: 'Устройство для заточки сменных ножей  модельного резца арт. 16-325',
      price: 620,
    };

    const resultOne = parseZadiTags(domKnife620);

    const expectedResultTwo = {
      title: 'Заготовка для ремня (красно-коричневый) 42мм (3-3,3мм) арт.K3516',
      price: 370,
    };

    const resultTwo = parseZadiTags(domBelt370);

    expect(resultOne).toEqual(expectedResultOne);

    expect(resultTwo).toEqual(expectedResultTwo);
  });
});
