import mongoose from 'mongoose';
import TimeSheetsModel from '../models/TimeSheets';

const { ObjectId } = mongoose.Types;

const isValidObjectId = (id) => ObjectId.isValid(id) && (String)(new ObjectId(id)) === id;

const getAllTimeSheets = async (req, res) => {
  try {
    const timeSheets = await TimeSheetsModel.find().populate('project').populate('task').populate('employee');
    return res.status(200).json({
      message: 'TimeSheets List',
      data: timeSheets,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
    });
  }
};

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
        message: `Time sheet with id ${id} not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'TimeSheet found',
      data: timeSheets,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
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
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
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
        message: `Time sheet with id ${id} not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json({
      message: `TimeSheet with the id ${id} updated successfully`,
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
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
        message: `Time sheet with id ${id} not found`,
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

export default {
  getTimeSheetById,
  deleteTimeSheet,
  editTimeSheet,
  getAllTimeSheets,
  createTimeSheet,
};
