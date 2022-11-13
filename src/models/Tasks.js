import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      unique: true,
    },
  },
);

export default mongoose.model('Tasks', taskSchema);
