import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetSchema = new Schema({
  description: { type: String, required: true },
  date: { type: Date, required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  task: { type: Schema.Types.ObjectId, ref: 'Tasks', required: true },
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  hours: { type: Number, required: true },
});

export default mongoose.model('TimeSheet', timeSheetSchema);
