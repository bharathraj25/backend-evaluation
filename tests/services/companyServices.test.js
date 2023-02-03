const { describe, it } = require('@jest/globals');
const { Company } = require('../../db/models');

const companyController = require('../../src/controllers/companyController');
const companyServices = require('../../src/services/companyServices');

describe('get all scores', () => {
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
});