const { describe, it } = require('@jest/globals');
const { Company } = require('../../db/models');

const companyServices = require('../../src/services/companyServices');

describe('get all scores', () => {

  const score = [
    {
      'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
      'name': 'Volkswagen',
      'score': 15.784075000000001
    }
  ];
  const companies = [
    {
      'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
      'name': 'Volkswagen',
      'cpi': 0.46,
      'cf': 523763,
      'mau': 0.05,
      'roic': 5.66,
    }
  ];

  it('should return list of all companies with scores', async () => {
    const spiedFindAll = jest.spyOn(Company, 'findAll')
      .mockResolvedValue(companies);

    const returedVal = await companyServices.getAllScore();
    expect(spiedFindAll).toBeCalled();
    expect(returedVal)
      .toEqual(score);
  });
});