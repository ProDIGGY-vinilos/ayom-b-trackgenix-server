import Projects from '../models/Projects';

const getProjectById = async (req, res) => {
  try {
    const project = await Projects.findById({ _id: req.params.id }).populate({
      path: 'employees',
      populate: {
        path:
      'employee',
      },
    });
    if (project) {
      return res.status(200).json({
        msg: 'Project found succesfully',
        data: project,
      });
    }
    return res.status(400).json({
      msg: `Cannot find project with ID: ${req.params.id}`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: `There was an error: ${err}`,
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
      });
    }
    return res.status(404).json({
      msg: `Cannot delete project with ID: ${req.params.id}`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: `There was an error: ${err}`,
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
      });
    }
    return res.status(404).json({
      msg: `Cannot find project with ID: ${req.params.id}`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: `There was an error: ${err}`,
    });
  }
};
const createProject = async (req, res) => {
  try {
    const project = new Projects({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      employees: req.body.employees,
    });
    const result = await project.save();
    return res.status(201).json({
      message: 'The project was created.',
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Error creating project. ${err}`,
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find(req.query).populate({
      path: 'employees',
      populate: {
        path:
      'employee',
      },
    });
    if (!projects.length) {
      return res.status(400).json({
        message: 'Non existent project!',
      });
    }
    return res.status(200).json({
      message: 'Projects found:',
      data: projects,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Error getting projects. ${err}`,
    });
  }
};

export default {
  getProjectById,
  deleteProject,
  updateProject,
  getAllProjects,
  createProject,
};
