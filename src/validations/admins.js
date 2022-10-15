import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const adminValidation = Joi.object({
    name: Joi.string().required().pattern(/^([^0-9]*)$/i), // Have to check if name and lastName have numebers
    lastName: Joi.string().required().pattern(/^([^0-9]*)$/i),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required(),
  });

  const validation = adminValidation.validate(req.body);

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
