import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeesValidation = Joi.object({
    name: Joi.string().alphanum().pattern(/^([^0-9]*)$/i, 'only letters').required(),
    lastName: Joi.string().alphanum().pattern(/^([^0-9]*)$/i, 'only letters').required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/, 'only numbers').required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, 'Letters, numbers and minimum 8 characters').required(),
  });

  const employeeForProjectValidation = Joi.object({
    employee: employeesValidation.required(),
    role: Joi.string().valid('DEV', 'QA', 'PM', 'TL').required(),
    rate: Joi.number().required(),
  });
  const projectValidation = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    clientName: Joi.string().min(3).required(),
    employees: Joi.array().items(employeeForProjectValidation).required(),
  });

  const timeSheetValidation = Joi.object({
    description: Joi.string().max(100).required(),
    date: Joi.date().required(),
    task: Joi.string().valid('BE', 'FE').required(),
    project: projectValidation.required(),
    employee: employeesValidation.required(),
    hours: Joi.number().integer().positive().required(),
  });

  const validation = timeSheetValidation.validate(req.body);

  if (validation.err) {
    return res.status(400).json({
      message: `There was an error: ${validation.err.message}`,
    });
  }

  return next();
};

export default {
  validateCreation,
};
