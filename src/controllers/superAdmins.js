import SuperAdmins from '../models/SuperAdmins';

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
  getSuperAdminById,
  editSuperAdmin,
  deleteSuperAdmin,
};
