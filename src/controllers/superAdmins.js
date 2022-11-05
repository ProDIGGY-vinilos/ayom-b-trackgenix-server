import SuperAdmins from '../models/SuperAdmins';

const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmins.find(req.query);
    return res.status(200).json({
      message: 'Super Admin List',
      data: superAdmins,
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

    if (superAdmin) {
      return res.status(200).json({
        message: `SuperAdmin found: ${superAdmin.name} ${superAdmin.lastName}!`,
        data: superAdmin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Cannot find Super Admin with this ID: ${req.params.id}`,
      error: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Something was wrong: ${err.message}`,
      error: true,
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
    const superAdminToDelete = await SuperAdmins.findByIdAndDelete(id);
    if (superAdminToDelete) {
      return res.status(204).json();
    }
    return res.status(404).json({
      message: `Cannot delete Super Admin with this ID: ${req.params.id}`,
      error: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Something was wrong: ${err.message}`,
      error: true,
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
