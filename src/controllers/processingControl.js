const readCsvData = require('../utils/readCsvData');

async function processCsvData(req, res, next) {
  try {
    let { url } = req.body;
    const data = await readCsvData(url);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  processCsvData
};