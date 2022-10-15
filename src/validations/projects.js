import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeeValidation = Joi.object({
    role: Joi.string().valid('DEV', 'QA', 'PM', 'TL').required(),
    rate: Joi.string().required(),
  });
  const projectValidation = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    clientName: Joi.string().min(3).required(),
    employee: Joi.array().items(employeeValidation),
  });

  const validation = projectValidation.validate(req.body);

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
