import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const timeSheetValidation = Joi.object({
    description: Joi.string().max(100).required(),
    date: Joi.date().required(),
    task: Joi.string().valid('BE', 'FE').required(),
  });

  const validation = timeSheetValidation.validate(req.body);

  if (validation.err) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.datails[0].message}`,
      data: undefined,
      error: true,
    });
  }

  return next();
};

export default {
  validateCreation,
};
