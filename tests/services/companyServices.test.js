const {describe, it} = require('@jest/globals');

const companyController = require('../../src/controllers/companyController');
const companyServices = require('../../src/services/companyServices');

describe('get all  () => {
  const tasks = [
    {id: 1, isDone: true, task: 'some task a'},
    {id: 2, isDone: false, task: 'some task b'}
  ];

  it('should return list of all tasks', async () => {
    const mockReq = {
      query: {},
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = () => {};

    jest.spyOn(taskServices, 'getTaskList').mockResolvedValue(tasks);

    await taskController.getTaskList(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(tasks);
  });
});