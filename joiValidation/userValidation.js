const Joi = require('joi');

const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/;

const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailPattern).required(),
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'employee').default('employee')
});

const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailPattern).required(),
  password: Joi.string().required()
});

const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailPattern),
  password: Joi.string().min(6),
  role: Joi.string().valid('admin', 'employee')
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema
};
