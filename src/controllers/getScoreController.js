const { getAllScore } = require('../services/getScore');

const getAllScoreController = async (req, res, next) => {
  try {
    const result = await getAllScore();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllScoreController
};