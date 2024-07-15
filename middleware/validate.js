const Joi = require('joi');
const ErrorHandler = require('../utilities/error-handling');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(ErrorHandler.Request_failed(error.details[0].message));
    }
    next();
  };
};

module.exports = validate;
