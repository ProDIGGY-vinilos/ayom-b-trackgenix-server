import mongoose from 'mongoose';
import TimeSheetsModel from '../models/TimeSheets';

const { ObjectId } = mongoose.Types;

const isValidObjectId = (id) => ObjectId.isValid(id) && (String)(new ObjectId(id)) === id;

const getTimeSheetById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }
    const timeSheets = await TimeSheetsModel.findById(id).populate('project').populate('task').populate('employee');
    if (!timeSheets) {
      return res.status(404).json({
        message: 'TimeSheet not found',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'TimeSheet found',
      data: timeSheets,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error ocurred ${err}`,
    });
  }
};

const deleteTimeSheet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }
    const result = await TimeSheetsModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: 'TimeSheet not found',
        error: true,
      });
    }
    return res.status(204).json({
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error ocurred ${err}`,
    });
  }
};

const editTimeSheet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }
    const result = await TimeSheetsModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'TimeSheet not found',
        error: true,
      });
    }
    return res.status(200).json({
      message: `TimeSheet with the id ${id} edited`,
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error ocurred ${err}`,
    });
  }
};
const getAllTimeSheets = async (req, res) => {
  try {
    const timeSheets = await TimeSheetsModel.find().populate('project').populate('task').populate('employee');

    return res.status(200).json({
      message: 'TimeSheets found',
      data: timeSheets,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Has occurred a problem: ${err}`,
    });
  }
};

const createTimeSheet = async (req, res) => {
  try {
    const timeSheets = new TimeSheetsModel({
      description: req.body.description,
      date: req.body.date,
      project: req.body.project,
      task: req.body.task,
      employee: req.body.employee,
      hours: req.body.hours,
    });

    const result = await timeSheets.save();
    return res.status(201).json({
      message: 'TimeSheet created successfully',
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Problem detected, creating TimeSheet ${err}`,
    });
  }
};

export default {
  getTimeSheetById,
  deleteTimeSheet,
  editTimeSheet,
  getAllTimeSheets,
  createTimeSheet,
};
