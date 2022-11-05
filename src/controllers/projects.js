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
        message: 'Project found',
        data: project,
      });
    }
    return res.status(400).json({
      message: `Project with id: ${req.params.id} not found `,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Project with id: ${req.params.id} not found`,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectToDelete = await Projects.findByIdAndDelete({ _id: req.params.id });
    if (projectToDelete) {
      return res.status(204).json({
        message: `Project with id:${req.params.id} delete successfully`,
        data: projectToDelete,
      });
    }
    return res.status(404).json({
      message: `Project with id:${req.params.id} not found`,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Can not delete Project with ID: ${req.params.id}`,
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
        message: `Project with id:${req.params.id} updated succesfully`,
        data: projectToUpdate,
      });
    }
    return res.status(404).json({
      message: `Project with id:${req.params.id} not found`,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Cannot edit Project with id ${req.params.id}`,
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
      message: 'Project created successfully',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Cannot create Project',
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
      return res.status(404).json({
        message: 'Projects not found',
      });
    }
    return res.status(200).json({
      message: 'Projects found:',
      data: projects,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Cannot get projects',
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
