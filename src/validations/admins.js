import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const adminValidation = Joi.object({
    name: Joi.string().required().alphanum().pattern(/^([^0-9]*)$/i, 'only letters'),
    lastName: Joi.string().required().alphanum().pattern(/^([^0-9]*)$/i, 'only letters'),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required(),
  });

  const validation = adminValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
    });
  }
  return next();
};

export default {
  validateCreation,
};
