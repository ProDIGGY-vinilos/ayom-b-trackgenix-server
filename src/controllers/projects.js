import Projects from '../models/Projects';

const getProjectById = async (req, res) => {
  try {
    const project = await Projects.findById({ _id: req.params.id });
    if (project) {
      return res.status(200).json({
        msg: 'Project found succesfully',
        data: project,
        error: false,
      });
    }
    return res.status(400).json({
      msg: `Cannot find project with ID: ${req.params.id}`,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `There was an error: ${error}`,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectToDelete = await Projects.findByIdAndDelete({ _id: req.params.id });
    if (projectToDelete) {
      return res.status(200).json({
        msg: 'Project delete succesfully',
        data: projectToDelete,
        error: false,
      });
    }
    return res.status(404).json({
      msg: `Cannot delete project with ID: ${req.params.id}`,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `There was an error: ${error}`,
      error: true,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const projectToUpdate = await Projects.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );
    if (projectToUpdate) {
      return res.status(200).json({
        msg: 'Project updated succesfully',
        data: projectToUpdate,
        error: false,
      });
    }
    return res.status(404).json({
      msg: `Cannot find project with ID: ${req.params.id}`,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `There was an error: ${error}`,
      error: true,
    });
  }
};

export default {
  getProjectById,
  deleteProject,
  updateProject,
};
