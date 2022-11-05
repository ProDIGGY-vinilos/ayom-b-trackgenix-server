import mongoose from 'mongoose';
import Admins from '../models/Admins';

const { ObjectId } = mongoose.Types;

const isValidObjectId = (id) => ObjectId.isValid(id) && (String)(new ObjectId(id)) === id;

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }
    const admin = await Admins.findById(id);
    return res.status(200).json({
      message: 'Admin Found',
      data: admin,
    });
  } catch (err) {
    return res.status(404).json({
      message: `Something was wrong: ${err.message}`,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }
    const admin = await Admins.findByIdAndDelete(id);

    if (!admin) {
      return res.status(404).json({
        message: 'ID doesnt match with a valid admin!',
        error: true,
      });
    }
    return res.status(204).json();
  } catch (err) {
    return res.status(404).json({
      message: `Something was wrong: ${err.message}`,
      error: true,
    });
  }
};

const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }
    const admin = await Admins.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true },
    );
    if (!admin) {
      return res.status(404).json({
        message: `Admin with ${id} dont exist on DB.`,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Admin with id ${id} found and successfully edited!`,
      data: admin,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Something was wrong: ${err.message}`,
    });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.find(req.query);
    if (!admins.length) {
      return res.status(404).json({
        message: 'Admin not found',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admins found',
      data: admins,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error ocurred: ${err}`,
      error: true,
    });
  }
};

const createAdmin = async (req, res) => {
  try {
    const admin = new Admins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await admin.save();
    return res.status(201).json({
      message: 'Admin created',
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
  getAdminById,
  deleteAdmin,
  editAdmin,
  getAllAdmins,
  createAdmin,
};
