import Joi from 'joi';

const adminValidations = (req, res, next) => {
  const editAdmin = Joi.object({
    name: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
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
  adminValidations,
};
