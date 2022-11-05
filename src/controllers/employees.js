import Employees from '../models/Employees';

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employees.findById(id);

    return res.status(200).json({
      message: `Employee with id:${id} found`,
      data: employee,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Cannot get Employee',
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
      message: `Employee with id:${id} updated successfully`,
      data: employee,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Cannot edit Employee with id:${req.params.id}`,
      error: true,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employees.findByIdAndDelete(id);

    return res.status(200).json({
      message: `Employee with id:${id} delete successfully`,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Cannot delete Employee',
      error: true,
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find(req.query);
    if (!employees.length) {
      return res.status(404).json({
        message: 'Employees not found',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employees found',
      data: employees,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Cannot get employees',
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
    return res.status(500).json({
      message: 'Cannot create Employee',
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
