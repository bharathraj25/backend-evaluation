const db = require('../../db/models');

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

module.exports = {
  getAllScore
};