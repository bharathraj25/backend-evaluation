const router = require('express').Router();

const { processCsvData } = require('../controllers/processingControl');

router.post('/save', processCsvData);

module.exports = router;