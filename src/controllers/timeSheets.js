import TimeSheetsModel from '../models/TimeSheets';

const getAllTimeSheets = async (req, res) => {
  try {
    const timeSheets = await TimeSheetsModel.find();

    return res.status(200).json({
      message: 'TimeSheets found',
      data: timeSheets,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: 'Has occurred a problem, searching TimeSheets',
      error: err,
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
      date: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Problem detected, creating TimeSheet',
      error: true,
    });
  }
};

export default {
  getAllTimeSheets,
  createTimeSheet,
};
