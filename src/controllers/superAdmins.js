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

const getSuperAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const superAdmin = await SuperAdmins.findById(id);

    return res.status(200).json({
      message: `SuperAdmin found: ${superAdmin.name} ${superAdmin.lastName}!`,
      data: superAdmin,
    });
  } catch (err) {
    return res.status(404).json({
      message: `Something was wrong: ${err.message}`,
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

const editSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const superAdmin = await SuperAdmins.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );

    return res.status(200).json({
      message: `SuperAdmin with the ID: ${id}, has been successfully edited!`,
      data: superAdmin,
    });
  } catch (err) {
    return res.status(404).json({
      message: `Something was wrong: ${err.message}`,
    });
  }
};

const deleteSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await SuperAdmins.findByIdAndDelete(id);

    return res.status(204).json();
  } catch (err) {
    return res.status(404).json({
      message: `Something was wrong: ${err.message}`,
    });
  }
};

export default {
  getAllSuperAdmins,
  createSuperAdmin,
  getSuperAdminById,
  editSuperAdmin,
  deleteSuperAdmin,
};
