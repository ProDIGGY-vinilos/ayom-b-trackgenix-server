import TimeSheetsModel from '../models/TimeSheets';

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
  getAllTimeSheets,
  createTimeSheet,
};
