import Employees from '../models/Employees';

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find();

    return res.status(200).json({
      message: 'Employee found',
      data: employees,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'An error ocurred',
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = new Employees({
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    });

    const result = await employee.save();
    return res.status(201).json({
      message: 'Employee created successfully',
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error ocurred: ${err}`,
    });
  }
};

export default {
  getAllEmployees,
  createEmployee,
};
