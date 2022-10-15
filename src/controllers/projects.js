import Projects from '../models/Projects';

const createProject = async (req, res) => {
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

export default {
  createProject,
};
