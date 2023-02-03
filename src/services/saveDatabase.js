const db = require('../../db/models');
const axios = require('axios');

const externalApiCall = async (url) => {
  return (await axios.get(
    url,
    { params: { answer: 42 } }
  )).data;
};

const fetchExtrenalApiData = async (csvData) => {
  const sectorApiPromise = [];
  const sectors = [];
  const companies = [];
  const companyApiPromise = [];

  // console.log(await externalApiCall("http://54.167.46.10/sector?name=Software"))
  // console.log(await externalApiCall("http://54.167.46.10/company/c1634e16-17c8-42f6-8513-b8c50a4f230c"))
  csvData.forEach(({ company_id, company_sector }) => {
    let urlCompany, urlSector;
    if (!sectors.includes(company_sector)) {
      sectors.push(company_sector);
      urlSector = 'http://54.167.46.10/sector?name=' + company_sector.toString();
      sectorApiPromise.push(externalApiCall(urlSector));
    }
    if (!companies.includes(company_id)) {
      urlCompany = 'http://54.167.46.10/company/' + company_id.toString();
      companies.push(company_id);
      companyApiPromise.push(externalApiCall(urlCompany));
    }
  });

  const sectorsData = await Promise.all(sectorApiPromise);
  const companiesData = await Promise.all(companyApiPromise);

  const companiesObj = {};

  companiesData.forEach((companyData, index) => {
    let companyId = companies[index];
    companiesObj[companyId] = companyData;
  });
  const companyInSector = {};
  sectorsData.forEach((sector, index) => {
    let sectorName = sectors[index];
    sector.forEach(company => {
      if (!companyInSector[sectorName]) {
        companyInSector[sectorName] = [];
      }
      const { cpi, cf, mau, roic } = getPerformaceIndex(company.performanceIndex);

      companyInSector[sectorName].push({
        id: company.companyId,
        cpi, cf, mau, roic,
        ...companiesObj[company.companyId]
      });
    });
  });

  return { companyInSector, sectors };
};

const getPerformaceIndex = (data) => {
  const performaceIndex = {};
  data.forEach(indexData => {
    performaceIndex[indexData.key] = indexData.value;
  });
  return performaceIndex;
};

const saveToDatabase = async (csvData) => {
  const insertSectorPromise = [];
  const insertCompanyPromise = [];

  const { companyInSector, sectors } = await fetchExtrenalApiData(csvData);
  sectors.forEach(sector => {
    insertSectorPromise.push(
      db.Sector.create({
        name: sector
      })
    );
    companyInSector[sector].forEach(company => {
      const { id, name, cpi, cf, mau, roic, description, ceo } = company;
      insertCompanyPromise.push(
        db.Company.create({
          id, name, description, ceo,
          cpi, cf, mau, roic,
          sector_name: sector
        })
      );
    });
  });

  await Promise.all(insertSectorPromise);
  await Promise.all(insertCompanyPromise);
  return { companyInSector };

};

module.exports = {
  saveToDatabase
};