import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeesValidation = Joi.object({
    name: Joi.string().required().alphanum().pattern(/^([^0-9]*)$/i, 'only letters'),
    lastName: Joi.string().required().alphanum().pattern(/^([^0-9]*)$/i, 'only letters'),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required(),
  });

  const validation = employeesValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};
export default {
  validateCreation,
};
