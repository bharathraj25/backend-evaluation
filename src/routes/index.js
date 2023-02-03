const router = require('express').Router();
const companySchema = require('../joiSchema/company.schema');
const { validationMiddleware } = require('../middleware/validation.middleware');


const { processCsvData } = require('../controllers/processingControl');
const { getCompanyByIdController, getAllScoreController, getCompaniesController, getUpdateCompanyController } = require('../controllers/companyController');

router.post('/api/save',
  validationMiddleware(companySchema.saveDatabse),
  processCsvData
);
router.get('/score', getAllScoreController);
router.get(
  '/api/companies',
  validationMiddleware(companySchema.getCompaniesBySector, 'query'),
  getCompaniesController);
router.post('/api/company',
  validationMiddleware(companySchema.updateCompany),
  getUpdateCompanyController
);
router.get('/api/company',
  validationMiddleware(companySchema.getCompanyById, 'query'),
  getCompanyByIdController
);
// router.get('/api/sector', getCompaniesController);


module.exports = router;