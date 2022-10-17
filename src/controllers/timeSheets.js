import TimeSheets from '../models/TimeSheets';

// Get by Id

const getTimeSheetById = async (req, res) => {
  try {
    const searchId = req.params.id;
    const timeSheets = await TimeSheets.findById({ _id: searchId });

    return res.status(200).json({
      message: 'TimeSheet found',
      data: timeSheets,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      error: true,
    });
  }
};

// Delete by Id

const deleteTimeSheet = async (req, res) => {
  try {
    const searchId = req.params.id;
    const result = await TimeSheets.findByIdAndDelete({ _id: searchId });

    return res.status(200).json({
      message: `TimeSheet with the id ${searchId} deleted`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      error: true,
    });
  }
};

// Edit by Id

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
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      error: true,
    });
  }
};

export default {
  getTimeSheetById,
  deleteTimeSheet,
  editTimeSheet,
};
