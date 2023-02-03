const joi = require('joi');

const urlSchema = {
  url: joi.string().required()
}

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
  id: companySchema.id.required(),
  name: companySchema.name,
  ceo: companySchema.ceo
});

module.exports = {
  updateCompany: paramSchema,
  getCompaniesBySector: joi.object({
    sector: companySchema.sector.required()
  }),
  getCompanyById: joi.object({
    id: companySchema.id.required()
  }),
};