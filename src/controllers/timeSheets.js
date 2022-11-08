import TimeSheetsModel from '../models/TimeSheets';

const getTimeSheetById = async (req, res) => {
  try {
    const searchId = req.params.id;
    const timeSheets = await TimeSheetsModel.findById({ _id: searchId }).populate('project').populate('task').populate('employee');
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
    return res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
    });
  }
};

const deleteTimeSheet = async (req, res) => {
  try {
    const searchId = req.params.id;
    const result = await TimeSheetsModel.findByIdAndDelete({ _id: searchId });
    if (!result) {
      return res.status(404).json({
        message: `TimeSheet with id:${req.params.id} not found`,
        error: true,
      });
    }
    return res.status(204).json({
      message: `TimeSheet with id:${req.params.id} deleted successfully`,
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
    const searchId = req.params.id;
    const result = await TimeSheetsModel.findByIdAndUpdate(
      { _id: searchId },
      { ...req.body },
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: `TimeSheet with id:${req.params.id} not found`,
        error: true,
      });
    }
    return res.status(201).json({
      message: `TimeSheet with the id ${searchId} updated successfully`,
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

export default {
  getTimeSheetById,
  deleteTimeSheet,
  editTimeSheet,
  getAllTimeSheets,
  createTimeSheet,
};
