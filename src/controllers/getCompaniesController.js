const { getCompaniesBySector } = require('../services/getCompanies');

const getCompaniesController = async (req, res, next) => {
  try {
    const { sector } = req.query;
    const result = await getCompaniesBySector(sector);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCompaniesController
};