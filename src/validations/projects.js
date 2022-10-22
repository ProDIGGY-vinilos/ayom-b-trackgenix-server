import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeeValidation = Joi.object({
    employee: Joi.string().required(),
    role: Joi.string().valid('DEV', 'QA', 'PM', 'TL').required(),
    rate: Joi.number().required(),
  });
  const projectValidation = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    clientName: Joi.string().min(3).required(),
    employees: Joi.array().items(employeeValidation),
  });

  const validation = projectValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
    });
  }
  return next();
};

export default {
  validateCreation,
};
