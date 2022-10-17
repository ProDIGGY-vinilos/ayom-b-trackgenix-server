import Admins from '../models/Admins';

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admins.findById(id);

    return res.status(200).json({
      message: 'Admin Found',
      data: admin,
    });
  } catch (err) {
    return res.status(404)
      .json({
        message: `Something was wrong: ${err.message}`,
      });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admins.findByIdAndDelete(id);

    return res.status(200)
      .json({
        message: `Admin with id: ${id} was successfully deleted!`,
        data: admin,
      });
  } catch (err) {
    return res.status(404)
      .json({
        message: `Something was wrong: ${err.message}`,
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

    return res.status(200)
      .json({
        message: `Admin with id ${id} found and successfully edited!`,
        data: admin,
      });
  } catch (err) {
    return res.status(404)
      .json({
        message: `Something was wrong: ${err.message}`,
      });
  }
};

export default {
  getAdminById,
  deleteAdmin,
  editAdmin,
};
