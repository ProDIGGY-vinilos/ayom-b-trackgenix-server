import Projects from '../models/Projects';

const createProject = async (req, res) => {
  try {
    const existProject = await Projects.findOne({ name: req.body.name });
    if (existProject) {
      return res.status(400).json({
        message: 'The project alredy exists!',
        data: undefined,
        error: true,
      });
    }
    const project = new Projects({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      employees: req.body.employee,
    });
    const result = await project.save();
    return res.status(201).json({
      message: 'The project was created.',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error creating project.',
      data: undefined,
      error: true,
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find();
    return res.status(200).json({
      message: 'Projects found:',
      data: projects,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'Error getting projects.',
      error: 'error',
    });
  }
};

export default {
  createProject,
  getAllProjects,
};
