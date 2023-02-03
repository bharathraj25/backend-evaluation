const router = require('express').Router();

const { processCsvData } = require('../controllers/processingControl');
const { getAllScoreController } = require('../controllers/getScoreController');
const { getCompaniesController } = require('../controllers/getCompaniesController');

router.post('/api/save', processCsvData);
router.get('/score', getAllScoreController);
router.get('/api/companies', getCompaniesController);

module.exports = router;