import mongoose from 'mongoose';
import Admins from '../models/Admins';

const getAdminById = async (req, res) => {
  const { id } = req.params;
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: `Cannot get admin with id ${id}`,
      data: undefined,
      error: true,
    });
  }
  try {
    const admin = await Admins.findById(id);
    if (admin) {
      return res.status(200).json({
        message: 'Admin Found',
        data: admin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with id ${id} not found`,
      data: undefined,
      error: true,
    });
  } catch (err) {
    return res.status(500)
      .json({
        message: `Server Error ${err}`,
        data: undefined,
        error: true,
      });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.find(req.query);
    return res.status(200).json({
      message: 'Admins List',
      data: admins,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admins.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({
        message: `Admin with id:${id} not found`,
        error: true,
      });
    }
    return res.status(204).json({
      message: `Admin with id:${id} deleted successfully`,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
    });
  }
};

const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admins.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (!admin) {
      return res.status(404).json({
        message: `Admin with id:${req.params.id} not found`,
        error: true,
      });
    }
    return res.status(201).json({
      message: `Admin with id:${req.params.id} updated successfully`,
      data: admin,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
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
      message: 'Admin created successfully',
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

export default {
  getAdminById,
  deleteAdmin,
  editAdmin,
  getAllAdmins,
  createAdmin,
};
