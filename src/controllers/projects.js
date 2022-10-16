import Projects from '../models/Projects';

const createProject = async (req, res) => {
  // si ya existe el proyecto, crearlo de nuevo? con que dato valido si ya existe?
  try {
    const project = new Projects({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      employee: [{ // se deberia poder cargar mas de un empleado a la vez?
        role: req.body.employee[0].role,
        rate: req.body.employee[0].rate,
      }],
    });
    const result = await project.save();
    return res.status(201).json({
      message: 'The project was created.',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error crating project.',
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
