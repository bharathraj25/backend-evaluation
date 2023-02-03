const { describe, it } = require('@jest/globals');

const companyController = require('../../src/controllers/companyController');
const companyServices = require('../../src/services/companyServices');

describe('get all companies with scores', () => {
  const scores = [
    {
      'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
      'name': 'Volkswagen',
      'score': 15.784075000000001
    },
    {
      'id': '728ae3b7-89dd-41eb-9608-4fc20c839d4c',
      'name': 'Mercedes',
      'score': 18.481825
    }
  ];

  it('should return list of all companies with scores', async () => {
    const mockReq = {
      query: {},
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = () => { };

    jest.spyOn(companyServices, 'getAllScore').mockResolvedValue(scores);

    await companyController.getAllScoreController(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(scores);
  });

  it('should return error if something goes wrong on service promise', async () => {
    const mockReq = {
      query: {},
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(companyServices, 'getAllScore').mockRejectedValue(new Error('Service error message'));
    await companyController.getAllScoreController(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new Error('Service error message'));
  });
});

describe('update company name', () => {
  const company =
  {
    'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
    'name': 'Volkswagen',
  };

  it('should return updated company object when name is passed', async () => {
    const mockReq = {
      query: {},
      params: {
        'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
      },
      body: {
        'name': 'Volkswagen',
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = () => { };

    jest.spyOn(companyServices, 'updateCompanyData').mockResolvedValue(company);

    await companyController.getUpdateCompanyController(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(company);
  });
  it('should return error if something goes wrong on service promise', async () => {
    const mockReq = {
      query: {},
      params: {
        'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
      },
      body: {
        'name': 'Volkswagen',
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(companyServices, 'updateCompanyData').mockRejectedValue(new Error('Service error message'));
    await companyController.getUpdateCompanyController(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new Error('Service error message'));
  });
});

describe('get company by id', () => {
  const company =
  {
    'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
    'name': 'Volkswagen',
    'score': 15.784075000000001
  };

  it('should return company object when company id is passed', async () => {
    const mockReq = {
      params: {
        'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = () => { };

    jest.spyOn(companyServices, 'getCompanyById').mockResolvedValue(company);

    await companyController.getCompanyByIdController(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(company);
  });
  it('should return error if something goes wrong on service promise', async () => {
    const mockReq = {
      params: {
        'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(companyServices, 'getCompanyById').mockRejectedValue(new Error('Service error message'));
    await companyController.getCompanyByIdController(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new Error('Service error message'));
  });
});

describe('get companies by sector name', () => {
  const company =
    [
      {
        'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
        'name': 'Volkswagen',
        'score': 15.784075000000001
      },
      {
        'id': '728ae3b7-89dd-41eb-9608-4fc20c839d4c',
        'name': 'Mercedes',
        'score': 18.481825
      }
    ];

  it('should return array object when sector name is passed', async () => {
    const mockReq = {
      query: {
        sector: 'Software'
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = () => { };

    jest.spyOn(companyServices, 'getCompaniesBySector').mockResolvedValue(company);

    await companyController.getCompaniesController(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(company);
  });
  it('should return error if something goes wrong on service promise', async () => {
    const mockReq = {
      query: {
        sector: 'Software'
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(companyServices, 'getCompaniesBySector').mockRejectedValue(new Error('Service error message'));
    await companyController.getCompaniesController(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new Error('Service error message'));
  });
});