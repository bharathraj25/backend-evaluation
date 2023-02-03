const db = require('../../db/models');

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

  result.sort((a, b) => b.score - a.score);

  return result.map((company, index) => {
    return { ...company, ranking: index + 1 };
  })
};

module.exports = {
  getCompaniesBySector
};