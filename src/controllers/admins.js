import Admins from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.find();
    return res.status(200).json({
      message: 'Admins found',
      data: admins,
    });
  } catch (err) {
    return res.status(404).json({
      message: `An error ocurred: ${err}`,
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
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error ocurred: ${err}`,
    });
  }
};

export default {
  getAllAdmins,
  createAdmin,
};
