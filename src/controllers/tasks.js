import mongoose from 'mongoose';
import Tasks from '../models/Tasks';

const { ObjectId } = mongoose.Types;

const isValidObjectId = (id) => ObjectId.isValid(id) && (String)(new ObjectId(id)) === id;

const getAllTasks = async (req, res) => {
  try {
    const taskList = await Tasks.find(req.body || {}).exec();
    return res.status(200).json({
      message: 'Tasks found',
      data: taskList,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
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
    return res.status(201).json({
      message: 'Task created successfully',
      data: newTaskCreated,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }

    const task = await Tasks.findById(id);
    if (!task) {
      return res.status(404).json({
        message: `Task with id ${id} not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Task with id:${id} found`,
      data: task,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }
    const taskToDelete = await Tasks.findByIdAndDelete(id);
    if (!taskToDelete) {
      return res.status(404).json({
        message: `Task with id ${id} not found`,
        data: undefined,
        error: true,
      });
    }
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }

    const taskToUpdate = await Tasks.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
    );
    if (!taskToUpdate) {
      return res.status(404).json({
        message: `Task with id ${id} not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Task updated successfully',
      data: taskToUpdate,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
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
