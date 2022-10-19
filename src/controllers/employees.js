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

export default {
  getEmployeeById,
  editEmployee,
  deleteEmployee,
};
