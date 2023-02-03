const axios = require('axios');
const csvtojson = require('csvtojson');

const readCsvData = async (url) => {
  const response = await axios.get(url, { responseType: 'blob', });
  const file = response.data;

  const data = await csvtojson()
    .fromString(file);
  return data;

};

module.exports = readCsvData;

