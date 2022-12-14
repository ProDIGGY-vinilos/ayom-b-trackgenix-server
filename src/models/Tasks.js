import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

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

taskSchema.plugin(mongooseDelete, { overrideMethods: ['find'] });

export default mongoose.model('Tasks', taskSchema);
