import Joi from 'joi';

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
  editValidation,
};
