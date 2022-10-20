import Tasks from '../models/Tasks';

const getAllTasks = async (req, res) => {
  try {
    const taskList = await Tasks.find(req.body || {}).exec();
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

const getTaskById = async (req, res) => {
  try {
    const task = await Tasks.findById({ _id: req.params.id });
    if (task) {
      return res.status(200).json({
        msg: 'Task found succesfully',
        data: task,
        error: false,
      });
    }
    return res.status(400).json({
      msg: `Cannot find task with ID: ${req.params.id}`,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `There was an error: ${error}`,
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskToDelete = await Tasks.findByIdAndDelete({ _id: req.params.id });
    if (taskToDelete) {
      return res.status(200).json({
        msg: 'Task delete succesfully',
        data: taskToDelete,
        error: false,
      });
    }
    return res.status(404).json({
      msg: `Cannot delete task with ID: ${req.params.id}`,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `There was an error: ${error}`,
      error: true,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskToUpdate = await Tasks.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );
    if (taskToUpdate) {
      return res.status(200).json({
        msg: 'Taskupdated succesfully',
        data: taskToUpdate,
        error: false,
      });
    }
    return res.status(404).json({
      msg: `Cannot find task with ID: ${req.params.id}`,
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
  getAllTasks,
  createNewTask,
  getTaskById,
  deleteTask,
  updateTask,
};
