import Joi from 'joi';

const createValidation = (req, res, next) => {
  const createTask = Joi.object({
    description: Joi.string().valid('FE', 'BE').required(),
  });

  const valdiation = createTask.validate(req.body);

  if (valdiation.error) {
    return res.status(406)
      .json({
        message: valdiation.error.message,
        data: undefined,
        error: true,
      });
  }

  return next();
};

export default {
  createValidation,
};
