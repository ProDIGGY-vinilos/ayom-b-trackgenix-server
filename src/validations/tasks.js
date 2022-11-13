import Joi from 'joi';

const createValidation = (req, res, next) => {
  const createTask = Joi.object({
    description: Joi.string().required().trim().regex(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
      .min(3),
  });

  const valdiation = createTask.validate(req.body);

  if (valdiation.error) {
    return res.status(406)
      .json({
        message: valdiation.error.message,
        error: true,
      });
  }

  return next();
};

export default {
  createValidation,
};
