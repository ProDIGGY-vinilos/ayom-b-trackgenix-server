import SuperAdmins from '../models/SuperAdmins';

const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmins.find(req.query);
    if (superAdmins.length) {
      return res.status(200).json({
        message: 'Super Admins found',
        data: superAdmins,
      });
    }
    return res.status(404).json({
      message: 'Super Admins not found',
      query: req.query,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Cannot get super admins',
    });
  }
};

const getSuperAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const superAdmin = await SuperAdmins.findById(id);

    if (superAdmin) {
      return res.status(200).json({
        message: `Super Admin with id:${req.params.id} found`,
        data: superAdmin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Super Admin with id:${req.params.id} not found`,
      error: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Cannot get super admin with id:${req.params.id}`,
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
    return res.status(500).json({
      message: 'Cannot create admin',
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

    return res.status(201).json({
      message: `Super Admin with id:${req.params.id} updated successfully`,
      data: superAdmin,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Cannot edit Admin with id:${req.params.id}`,
    });
  }
};

const deleteSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const superAdminToDelete = await SuperAdmins.findByIdAndDelete(id);
    if (superAdminToDelete) {
      return res.status(204).json({
        message: `Super Admin with id:${id} delete successfully`,
      });
    }
    return res.status(404).json({
      message: `Super Admin with id: ${req.params.id} not found`,
      error: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Cannot delete Admin with id: ${req.params.id}`,
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
