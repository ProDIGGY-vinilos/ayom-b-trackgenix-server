import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const superAdminValidation = Joi.object({
    name: Joi.string().alphanum().pattern(/([a-zA-Z])$/i, 'Only letters').required(),
    lastName: Joi.string().alphanum().pattern(/([a-zA-Z])$/i, 'Only letters').required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().alphanum().pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, 'Letters, numbers and minimum 8 characters').required(),
  });

  const validation = superAdminValidation.validate(req.body);

  if (validation.err) {
    return res.status(400).json({
      message: `There was an error: ${validation.err.message}`,
    });
  }

  return next();
};

export default {
  validateCreation,
};
