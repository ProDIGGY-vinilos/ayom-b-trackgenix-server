import TimeSheetsModel from '../models/TimeSheets';

const getTimeSheetById = async (req, res) => {
  try {
    const searchId = req.params.id;
    const timeSheets = await TimeSheetsModel.findById({ _id: searchId });

    return res.status(200).json({
      message: 'TimeSheet found',
      data: timeSheets,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error ocurred ${err}`,
    });
  }
};

const deleteTimeSheet = async (req, res) => {
  try {
    const searchId = req.params.id;
    const result = await TimeSheetsModel.findByIdAndDelete({ _id: searchId });

    return res.status(204).json({
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error ocurred ${err}`,
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

    return res.status(200).json({
      message: `TimeSheet with the id ${searchId} edited`,
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error ocurred ${err}`,
    });
  }
};
const getAllTimeSheets = async (req, res) => {
  try {
    const timeSheets = await TimeSheetsModel.find();

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
      task: req.body.task,
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
