import Employees from '../models/Employees';

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employees.findById(id);

    return res.status(200).json({
      message: `Employee found: ${employee.name} ${employee.lastName}!`,
      data: employee,
    });
  } catch (err) {
    return res.status(404).json({
      message: `Something was wrong: ${err.message}`,
    });
  }
};

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employees.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );

    return res.status(200).json({
      message: `Employee with the ID: ${id}, has been successfully edited!`,
      data: employee,
    });
  } catch (err) {
    return res.status(404).json({
      message: `Something was wrong: ${err.message}`,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employees.findByIdAndDelete(id);

    return res.status(204).json();
  } catch (err) {
    return res.status(404).json({
      message: `Something was wrong: ${err.message}`,
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find();

    return res.status(200).json({
      message: 'Employee found',
      data: employees,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error ocurred: ${err}`,
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
  getEmployeeById,
  editEmployee,
  deleteEmployee,
  getAllEmployees,
  createEmployee,
};
