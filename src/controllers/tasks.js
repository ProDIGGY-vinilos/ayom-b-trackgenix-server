import Tasks from '../models/Tasks';

const getAllTasks = async (req, res) => {
  try {
    const taskList = await Tasks.find();

    return res.status(200)
      .json({
        message: 'Tasks found!',
        data: taskList,
        error: false,
      });
  } catch (err) {
    return res.status(404)
      .json({
        message: 'There was an error sending the request!',
        error: err,
      });
  }
};

const createNewTask = async (req, res) => {
  try {
    const newTask = Tasks.create({
      description: req.body.description,
    });
    const newTaskCreated = await newTask.save();
    return res.status(201)
      .json({
        message: 'Task successfully created!',
        data: newTaskCreated,
        error: false,
      });
  } catch (err) {
    return res.status(400)
      .json({
        message: 'Something was wrong with this request!',
        error: err,
      });
  }
};

export default {
  getAllTasks,
  createNewTask,
};
