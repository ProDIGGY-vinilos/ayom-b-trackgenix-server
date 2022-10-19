import Projects from '../models/Projects';

const createProject = async (req, res) => {
  try {
    const existProject = await Projects.find({ name: req.body.name });
    if (existProject) {
      return res.status(400).json({
        message: 'The project alredy exists!',
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
    });
  } catch (err) {
    return res.status(400).json({
      message: `Error creating project. ${err}`,
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find(req.query);
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
  createProject,
  getAllProjects,
};
