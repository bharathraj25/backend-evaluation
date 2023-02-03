const router = require('express').Router();
const companySchema = require('../joiSchema/company.schema');


const { processCsvData } = require('../controllers/processingControl');
const { getCompanyByIdController, getAllScoreController, getCompaniesController, getUpdateCompanyController } = require('../controllers/companyController');

router.post('/api/save', processCsvData);
router.get('/score', getAllScoreController);
router.get('/api/companies', companySchema.getCompaniesBySector, getCompaniesController);
router.post('/api/company', companySchema.updateCompany, getUpdateCompanyController);
router.get('/api/company', companySchema.getCompanyById, getCompanyByIdController);
// router.get('/api/sector', getCompaniesController);


module.exports = router;