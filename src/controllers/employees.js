import mongoose from 'mongoose';
import Employees from '../models/Employees';
import firebase from '../Helpers/Firebase';

const { ObjectId } = mongoose.Types;

const isValidObjectId = (id) => ObjectId.isValid(id) && (String)(new ObjectId(id)) === id;

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find(req.query);
    return res.status(200).json({
      message: 'Employees list',
      data: employees,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }
    const employee = await Employees.findById(id);
    if (!employee) {
      return res.status(404).json({
        message: `Employee with id ${id} not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee found',
      data: employee,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'EMPLOYEE' });

    const employee = new Employees({
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      firebaseUid: newFirebaseUser.uid,
    });

    const result = await employee.save();
    return res.status(201).json({
      message: 'Employee created successfully',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
    });
  }
};

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }
    const employee = await Employees.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true },
    );
    if (!employee) {
      return res.status(404).json({
        message: `Employee with id ${id} not found`,
        data: undefined,
        error: true,
      });
    }

    await firebase.auth().updateUser(employee.firebaseUid, {
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json({
      message: `Employee with id ${id} updated successfully`,
      data: employee,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }
    // const employee = await Employees.restore();
    const employee = await Employees.deleteById(id);
    if (!employee) {
      return res.status(404).json({
        message: `Employee with id ${id} not found`,
        data: undefined,
        error: true,
      });
    }

    // await firebase.auth().deleteUser(employee.firebaseUid);

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
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
