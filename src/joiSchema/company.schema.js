const joi = require('joi');

const urlSchema = joi.object({
  urlLink: joi.string().required()
});

const companySchema = {
  id: joi
    .string(),
  name: joi
    .string(),
  ceo: joi
    .string(),
  description: joi
    .string(),
  cpi: joi
    .number(),
  cf: joi
    .number(),
  mau: joi
    .number(),
  roic: joi
    .number(),
  sector: joi.string(),
};

const paramSchema = joi.object({
  id: companySchema.id
});

const updateSchema = joi.object({
  name: companySchema.name,
  ceo: companySchema.ceo
}).min(1);


module.exports = {
  saveDatabse: urlSchema,
  updateCompany: updateSchema,
  getCompaniesBySector: joi.object({
    sector: companySchema.sector.required()
  }),
  getCompanyById: paramSchema
};