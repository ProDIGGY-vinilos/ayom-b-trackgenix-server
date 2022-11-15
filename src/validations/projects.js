import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeeValidation = Joi.object({
    employee: Joi.string().required(),
    role: Joi.string().valid('DEV', 'QA', 'PM', 'TL').required(),
    rate: Joi.number().positive().required(),
  });
  const projectValidation = Joi.object({
    name: Joi.string().required().trim().regex(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
      .min(3),
    description: Joi.string().required().trim().regex(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
      .min(3),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),
    clientName: Joi.string().required().trim().regex(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
      .min(3),
    employees: Joi.array().items(employeeValidation),
  });

  const validation = projectValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
};
