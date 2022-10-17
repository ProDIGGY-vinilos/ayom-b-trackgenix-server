import TimeSheets from '../models/TimeSheets';

const getTimeSheetById = async (req, res) => {
  try {
    const searchId = req.params.id;
    const timeSheets = await TimeSheets.findById({ _id: searchId });

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
    const result = await TimeSheets.findByIdAndDelete({ _id: searchId });

    return res.status(200).json({
      message: `TimeSheet with the id ${searchId} deleted`,
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
    const result = await TimeSheets.findByIdAndUpdate(
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

export default {
  getTimeSheetById,
  deleteTimeSheet,
  editTimeSheet,
};
