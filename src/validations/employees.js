import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeesValidation = Joi.object({
    name: Joi.string().alphanum().pattern(/^([^0-9]*)$/i, 'only letters').required(),
    lastName: Joi.string().alphanum().pattern(/^([^0-9]*)$/i, 'only letters').required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/, 'only numbers').required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, 'Letters, numbers and minimum 8 characters').required(),
  });

  const validation = employeesValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.message}`,
    });
  }
  return next();
};
export default {
  validateCreation,
};
