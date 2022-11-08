import Tasks from '../models/Tasks';

const getAllTasks = async (req, res) => {
  try {
    const taskList = await Tasks.find(req.body || {}).exec();
    return res.status(200).json({
      message: 'Tasks found',
      data: taskList,
      error: false,
    });
  } catch (err) {
    return res.status(500)
      .json({
        message: 'Cannot get Tasks',
        error: true,
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
        message: 'Task created successfully',
        data: newTaskCreated,
        error: false,
      });
  } catch (err) {
    return res.status(500)
      .json({
        message: 'Cannot create Task',
        error: true,
      });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Tasks.findById({ _id: req.params.id });
    if (task) {
      return res.status(200).json({
        message: `Task with id:${req.params.id} found`,
        data: task,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Task with id:${req.params.id} not found`,
      error: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Cannot get Task',
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskToDelete = await Tasks.findByIdAndDelete({ _id: req.params.id });
    if (taskToDelete) {
      return res.status(204).json({
        message: `Task with id:${req.params.id} deleted successfully`,
      });
    }
    return res.status(404).json({
      message: `Task with id: ${req.params.id} not found`,
      error: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Cannot deleted Task with id: ${req.params.id}`,
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
      return res.status(201).json({
        message: 'Task updated successfully',
        data: taskToUpdate,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Task with id:${req.params.id} not found`,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Cannot edit Task with id:${req.params.id}`,
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
