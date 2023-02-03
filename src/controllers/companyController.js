const companyServices = require('../services/companyServices');

const getAllScoreController = async (req, res, next) => {
  try {
    const result = await companyServices.getAllScore();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};


const getCompaniesController = async (req, res, next) => {
  try {
    const { sector } = req.query;
    const result = await companyServices.getCompaniesBySector(sector);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getUpdateCompanyController = async (req, res, next) => {
  try {
    const { id, name, ceo } = req.body;
    const result = await companyServices.updateCompanyData(id.toString(), ceo, name);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const getCompanyByIdController = async (req, res, next) => {
  try {
    const { id } = req.query;
    const result = await companyServices.getCompanyById(id.toString());
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCompaniesController,
  getAllScoreController,
  getUpdateCompanyController,
  getCompanyByIdController
};