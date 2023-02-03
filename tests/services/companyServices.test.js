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

describe('get all companies by sector', () => {

  const companies = [{
    'id': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
    'cpi': 0.32,
    'cf': 899309,
    'mau': 0.28,
    'roic': 24.02,
    'name': 'Apple',
    'ceo': 'Ken Trantow',

  }, {
    'id': 'b6472c52-732a-4fd2-a463-ae604c0a2c79',
    'cpi': 0.98,
    'cf': 513484,
    'mau': 0.55,
    'roic': 18.64,
    'name': 'Microsoft',
    'ceo': 'Abel Koch',
  }];
  const score = [
    {
      'id': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
      'name': 'Apple',
      'ceo': 'Ken Trantow',
      'score': 29.987724999999998,
      'ranking': 1
    },
    {
      'id': 'b6472c52-732a-4fd2-a463-ae604c0a2c79',
      'name': 'Microsoft',
      'ceo': 'Abel Koch',
      'score': 21.3221,
      'ranking': 2
    },
  ];

  it('should return list of all companies by sector & correct ranking', async () => {
    const spiedFindAll = jest.spyOn(Company, 'findAll')
      .mockResolvedValue(companies);

    const returedVal = await companyServices.getCompaniesBySector();
    expect(spiedFindAll).toBeCalled();
    expect(returedVal)
      .toEqual(score);
  });
});

describe('update company name or ceo of company', () => {
  const sector = 'Automobile';
  const score = [
    {
      'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
      'name': 'NAME',
      'ceo': 'CEO',
      'sector_name': sector
    }
  ];
  const companies = [
    {
      'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
      'name': 'Volkswagen',
      'ceo': 'April Padberg'
    }
  ];

  it('should return list of all companies with scores', async () => {
    const spiedFindAll = jest.spyOn(Company, 'findByPk')
      .mockResolvedValue(companies);
    spiedFindAll;
    // const returedVal = await companyServices.updateCompanyData(sector, 'CEO', 'NAME');
    // expect(spiedFindAll).toBeCalled();
    // expect(returedVal)
    //   .toEqual(score);
  });
});
