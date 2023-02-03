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
router.patch('/api/company/:id',
  validationMiddleware(companySchema.getCompanyById, 'params'),
  validationMiddleware(companySchema.updateCompany),
  getUpdateCompanyController
);
router.get('/api/company/:id',
  validationMiddleware(companySchema.getCompanyById, 'params'),
  getCompanyByIdController
);
// router.get('/api/sector', getCompaniesController);


module.exports = router;