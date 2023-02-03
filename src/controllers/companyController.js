const { getCompaniesBySector, getCompanyById, getAllScore, updateCompanyData } = require('../services/companyServices');

const getAllScoreController = async (req, res, next) => {
  try {
    const result = await getAllScore();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};


const getCompaniesController = async (req, res, next) => {
  try {
    const { sector } = req.query;
    const result = await getCompaniesBySector(sector);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getUpdateCompanyController = async (req, res, next) => {
  try {
    const { id, name, ceo } = req.body;
    console.log(req.body);
    const result = await updateCompanyData(id.toString(), ceo, name);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const getCompanyByIdController = async (req, res, next) => {
  try {
    const { id } = req.query;
    console.log(req.body);
    const result = await getCompanyById(id.toString());
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