const { describe, it } = require('@jest/globals');
const { Company } = require('../../db/models');
const { RequiredKeyError, NotFoundError } = require('../../src/error');

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
  const sectorName = 'Software';
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

    const returedVal = await companyServices.getCompaniesBySector(sectorName);
    expect(spiedFindAll).toBeCalled();
    expect(returedVal)
      .toEqual(score);
  });

  it('should return error when wrong/not existed sector is passed', async () => {
    const spiedFindAll = jest.spyOn(Company, 'findAll')
      .mockResolvedValue([]);

    expect(spiedFindAll).toBeCalled();
    companyServices.getCompaniesBySector('ABCD').catch(e =>
      expect(e).toEqual(
        new NotFoundError('No Records Found!')
      )
    );
  });
});

describe('update company name or ceo of company', () => {
  const score =
    { 'ceo': 'CEO', 'id': '95b5a067-808a-44a9-a490-b4ef8a045f61', 'name': 'NAME', 'sector_name': 'SECTOR' };
  const company =
  {
    'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
    'name': 'Volkswagen',
    'ceo': 'April Padberg',
    'sector_name': 'SECTOR',
    save: jest.fn()
  }
    ;

  it('should return list of all companies with scores', async () => {
    const spiedFindAll = jest.spyOn(Company, 'findByPk')
      .mockResolvedValue(company);
    const returedVal = await companyServices.updateCompanyData(company.id, 'CEO', 'NAME');
    expect(spiedFindAll).toBeCalled();
    expect(returedVal)
      .toEqual(score);
  });

  it('should return Err when no data found (i.e either ceo or company name)', async () => {

    companyServices.updateCompanyData(company.id, null, null).catch(e =>
      expect(e).toEqual(
        new RequiredKeyError('Required either ceo or company name')
      )
    );
  });
});

describe('get company by id', () => {
  const companyId = 'abc-def';
  const company = {
    'id': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
    'name': 'Apple',
    'description': 'Nihil optio dolor nostrum animi totam perferendis dolor. Perspiciatis similique eos dignissimos deserunt asperiores autem asperiores explicabo earum. Ut vitae fugit facere consequatur deserunt. Voluptatum nulla dolores consectetur hic dignissimos molestias tempore. Aliquam quae ducimus libero. Qui deserunt ut sapiente facilis doloremque.',
    'ceo': 'Ken Trantow',
    'sector_name': 'Software',
    'cpi': '0.32',
    'cf': '899309',
    'mau': '0.28',
    'roic': '24.02',
    'createdAt': '2023-02-03T09:30:37.971Z',
    'updatedAt': '2023-02-03T09:30:37.971Z'
  };

  it('should return company when correct id is passed', async () => {
    const spiedFindAll = jest.spyOn(Company, 'findByPk')
      .mockResolvedValue(company);

    const returedVal = await companyServices.getCompanyById(companyId);
    expect(spiedFindAll).toBeCalled();
    expect(returedVal)
      .toEqual(company);
  });

  it('should return error when wrong/not existed company id is passed', async () => {
    const spiedFindAll = jest.spyOn(Company, 'findByPk')
      .mockResolvedValue(null);

    expect(spiedFindAll).toBeCalled();
    companyServices.getCompanyById(companyId).catch(e =>
      expect(e).toEqual(
        new NotFoundError('No Record Found!')
      )
    );
  });
});
