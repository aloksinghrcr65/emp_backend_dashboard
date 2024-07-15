const Joi = require('joi');

const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/;

const registerEmployeeSchema = Joi.object({
  emp_name: Joi.string().required(),
  emp_address: Joi.string().required(),
  emp_designation: Joi.string().required(),
  emp_department: Joi.string().required(),
  emp_contact: Joi.string().required(),
  emp_email: Joi.string().pattern(emailPattern).required(),
  company_email: Joi.string().required(),
  password: Joi.string().required()
});
const updateEmployeeSchema = Joi.object({
  emp_name: Joi.string(),
  emp_address: Joi.string(),
  emp_designation: Joi.string(),
  emp_department: Joi.string(),
  emp_contact: Joi.string(),
  emp_email: Joi.string().pattern(emailPattern),
  company_email: Joi.string(),
  password: Joi.string()
});

module.exports = {
  registerEmployeeSchema,
  updateEmployeeSchema
};
