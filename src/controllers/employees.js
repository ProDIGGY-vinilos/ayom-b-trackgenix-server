import Employees from '../models/Employees';

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employees.findById(id);

    return res.status(200).json({
      message: `Employee found: ${employee.name} ${employee.lastName}!`,
      data: employee,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Something was wrong: ${err.message}`,
      error: true,
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
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Something was wrong: ${err.message}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employees.findByIdAndDelete(id);

    return res.status(200).json();
  } catch (err) {
    return res.status(400).json({
      message: `Something was wrong: ${err.message}`,
      error: true,
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find(req.query);
    if (!employees.length) {
      return res.status(404).json({
        message: 'Employee not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee found',
      data: employees,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error ocurred: ${err}`,
      data: undefined,
      error: true,
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
    return res.status(200).json({
      message: 'Employee created successfully',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error ocurred: ${err}`,
      error: true,
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
