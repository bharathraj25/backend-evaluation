const readCsvData = require('../utils/readCsvData');
const { saveToDatabase } = require('../services/saveDatabase');

const processCsvData = async (req, res, next) => {
  try {
    let { urlLink } = req.body;
    const data = await readCsvData(urlLink);
    let result = await saveToDatabase(data);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  processCsvData
};