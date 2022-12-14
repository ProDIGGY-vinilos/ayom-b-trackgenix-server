import mongoose from 'mongoose';
import SuperAdmins from '../models/SuperAdmins';
import firebase from '../Helpers/Firebase';

const { ObjectId } = mongoose.Types;

const isValidObjectId = (id) => ObjectId.isValid(id) && (String)(new ObjectId(id)) === id;

const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmins.find(req.query);
    return res.status(200).json({
      message: 'Super Admins list',
      data: superAdmins,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
    });
  }
};

const getSuperAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }
    const superAdmin = await SuperAdmins.findById(id);
    if (!superAdmin) {
      return res.status(404).json({
        message: `Super admin with id ${id} not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Super Admin found',
      data: superAdmin,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
    });
  }
};

const getSuperAdminByFirebaseId = async (req, res) => {
  try {
    const { id } = req.params;

    const SuperAdmin = await SuperAdmins.find({ firebaseUid: id });

    return res.status(200).json({
      message: 'Admin found',
      data: SuperAdmin,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
    });
  }
};

const createSuperAdmin = async (req, res) => {
  try {
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'SUPER_ADMIN' });

    const superAdmins = new SuperAdmins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      firebaseUid: newFirebaseUser.uid,
    });

    const result = await superAdmins.save();
    return res.status(201).json({
      message: 'Super Admin created successfully',
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

const editSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }
    const superAdmin = await SuperAdmins.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true },
    );
    if (!superAdmin) {
      return res.status(404).json({
        message: `Super admin with id ${id} not found`,
        data: undefined,
        error: true,
      });
    }

    await firebase.auth().updateUser(superAdmin.firebaseUid, {
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json({
      message: `Super Admin with id ${req.params.id} updated successfully`,
      data: superAdmin,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
    });
  }
};

const deleteSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }
    const superAdmin = await SuperAdmins.findByIdAndDelete(id);
    if (!superAdmin) {
      return res.status(404).json({
        message: `Super admin with id ${id} not found`,
        data: undefined,
        error: true,
      });
    }

    await firebase.auth().deleteUser(superAdmin.firebaseUid);

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
    });
  }
};

export default {
  getAllSuperAdmins,
  getSuperAdminById,
  getSuperAdminByFirebaseId,
  createSuperAdmin,
  editSuperAdmin,
  deleteSuperAdmin,
};
