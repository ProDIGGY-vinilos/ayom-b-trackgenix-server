import Projects from '../models/Projects';

const getProjectById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await Projects.findById({ _id: req.params.id });
      return res.status(200).json({
        msg: 'Project found succesfully',
        data: project,
        error: false,
      });
    }
    return res.status(400).json({
      msg: 'Cannot find project with this ID',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
      data: error,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'ID was not provided',
        data: undefined,
        error: true,
      });
    }
    const projectToDelete = await Projects.findByIdAndDelete({ _id: req.params.id });
    if (projectToDelete) {
      return res.status(200).json({
        msg: 'Project delete succesfully',
        data: projectToDelete,
        error: false,
      });
    }
    return res.status(404).json({
      msg: 'Project was not found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
      data: error,
      error: true,
    });
  }
};

export default {
  getProjectById,
  deleteProject,
};
