import Tasks from '../models/Tasks';

const getAllTasks = async (req, res) => {
  try {
    const taskList = await Tasks.find();

    return res.status(200)
      .json({
        message: 'Tasks found!',
        data: taskList,
      });
  } catch (err) {
    return res.status(404)
      .json({
        message: `There was an error sending the request! Error: ${err.message}`,
      });
  }
};

const createNewTask = async (req, res) => {
  try {
    const newTask = await Tasks.create({
      description: req.body.description,
    });
    const newTaskCreated = await newTask.save();
    return res.status(201)
      .json({
        message: 'Task successfully created!',
        data: newTaskCreated,
      });
  } catch (err) {
    return res.status(400)
      .json({
        message: `Something was wrong with this request! Error: ${err.message}`,
      });
  }
};

export default {
  getAllTasks,
  createNewTask,
};
