import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const superAdminValidation = Joi.object({
    name: Joi.string().alphanum().pattern(/([a-zA-Z])$/i, 'Only letters').required(),
    lastName: Joi.string().alphanum().pattern(/([a-zA-Z])$/i, 'Only letters').required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().alphanum().required(),
  });

  const validation = superAdminValidation.validate(req.body);

  if (validation.err) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.datails[0].message}`,
    });
  }

  return next();
};

export default {
  validateCreation,
};
