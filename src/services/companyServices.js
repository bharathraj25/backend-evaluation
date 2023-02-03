const db = require('../../db/models');

const { NotFoundError } = require('../error');

const getAllScore = async () => {
  const data = await db.Company.findAll();
  const result = [];

  data.forEach(company => {
    let { cpi, cf, mau, roic, name, id } = company;
    let score = ((Number(cpi) * 10) + (Number(cf) / 10000) + (Number(mau) * 10) + Number(roic)) / 4;
    result.push({
      id,
      name,
      score
    });
  });

  return result;
};

const getCompaniesBySector = async (sectorName) => {
  const data = await db.Company.findAll({
    where: {
      sector_name: sectorName
    }
  });
  const result = [];

  data.forEach(company => {
    let { cpi, cf, mau, roic, name, id, ceo } = company;
    let score = ((Number(cpi) * 10) + (Number(cf) / 10000) + (Number(mau) * 10) + Number(roic)) / 4;
    result.push({
      id,
      name,
      ceo,
      score
    });
  });

  if (result.length == 0) throw NotFoundError('No Records Found!');
  result.sort((a, b) => b.score - a.score);

  return result.map((company, index) => {
    return { ...company, ranking: index + 1 };
  });
};

const updateCompanyData = async (companyId, ceo = null, companyName = null) => {
  const companyObj = await db.Company.findByPk(companyId);
  if (ceo) companyObj['ceo'] = ceo;
  if (companyName) companyObj['name'] = companyName;
  companyObj.save();
  const { id, name, sector_name } = companyObj;
  return { id, name, ceo, sector_name };
};

const getCompanyById = async (companyId) => {
  const companyObj = await db.Company.findByPk(companyId);
  return companyObj;
};



module.exports = {
  getAllScore,
  getCompaniesBySector,
  updateCompanyData,
  getCompanyById
};