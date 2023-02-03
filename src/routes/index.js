const router = require('express').Router();

const { processCsvData } = require('../controllers/processingControl');
const { getAllScoreController, getCompaniesController, getUpdateCompanyController } = require('../controllers/companyController');

router.post('/api/save', processCsvData);
router.get('/score', getAllScoreController);
router.get('/api/companies', getCompaniesController);
router.post('/api/company', getUpdateCompanyController);

module.exports = router;