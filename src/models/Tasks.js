import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    description: {
      type: String,
      enum: ['BE', 'FE'],
      required: true,
    },
  },
  {
    strictQuery: true,
  },
);

export default mongoose.model('Tasks', taskSchema);
