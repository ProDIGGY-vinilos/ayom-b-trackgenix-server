import SuperAdmins from '../models/SuperAdmins';

// GetAllSuperAdmins
const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmins.find();

    return res.status(200).json({
      message: 'Super Admin found',
      data: superAdmins,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      error: true,
    });
  }
};

// Create Super Admin

const createSuperAdmin = async (req, res) => {
  try {
    const superAdmins = new SuperAdmins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    const result = await superAdmins.save();
    return res.status(201).json({
      message: 'Super Admin created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred',
      error: true,
    });
  }
};
export default {
  getAllSuperAdmins,
  createSuperAdmin,
};
