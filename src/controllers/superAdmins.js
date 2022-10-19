import SuperAdmins from '../models/SuperAdmins';

const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmins.find(req.query);
    if (superAdmins.length) {
      return res.status(200).json({
        message: 'Super Admin found',
        data: superAdmins,
      });
    }
    return res.status(404).json({
      message: 'Super Admin not found',
      query: req.query,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error ocurred ${err}`,
    });
  }
};

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
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error ocurred ${err}`,
    });
  }
};
export default {
  getAllSuperAdmins,
  createSuperAdmin,
};
