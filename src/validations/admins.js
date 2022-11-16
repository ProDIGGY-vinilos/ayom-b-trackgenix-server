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
      error: true,
    });
  }
  return next();
};

const editValidation = (req, res, next) => {
  const editAdmin = Joi.object({
    name: Joi.string().alphanum().pattern(/([a-zA-Z])$/i, 'only letters').required(),
    lastName: Joi.string().alphanum().pattern(/([a-zA-Z])$/i, 'only letters').required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().alphanum().required(),
  });

  const validation = editAdmin.validate(req.body);

  if (validation.error) {
    return res.status(406)
      .json({
        message: validation.error.message,
        data: undefined,
        error: true,
      });
  }
  return next();
};

export default {
  validateCreation,
  editValidation,
};
