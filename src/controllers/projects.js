import Projects from '../models/Projects';

const createProject = async (req, res) => {
  // si ya existe el proyecto, crearlo de nuevo? con que dato valido si ya existe?
  try {
    // const employees = new Employees({
    //   role: req.body.employee.role,
    //   rate: req.body.employee.rate,
    // });
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
      error: 'error',
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
