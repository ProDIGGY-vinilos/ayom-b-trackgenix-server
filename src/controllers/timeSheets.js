import TimeSheets from '../models/TimeSheets';

// Get by Id

const getTimeSheetById = async (req, res) => {
  try {
    const { id } = req.params.id;
    const timeSheets = await TimeSheets.findById(id);

    return res.status(200).json({
      message: 'TimeSheet found',
      data: timeSheets,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: 'An error ocurred',
      error: err,
    });
  }
};

// Delete by Id

const deleteTimeSheet = async (req, res) => {
  try {
    const { id } = req.params.id;
    const result = await TimeSheets.findByIdAndDelete(id);

    return res.status(200).json({
      message: `TimeSheet with the id ${id} deleted`,
      data: result,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: 'An error ocurred',
      error: err,
    });
  }
};

export default {
  getTimeSheetById,
  deleteTimeSheet,
};
