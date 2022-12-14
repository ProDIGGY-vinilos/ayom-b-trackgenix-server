import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  clientName: {
    type: String,
    required: true,
  },
  employees: [{
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  }],
});

projectSchema.plugin(mongooseDelete, { overrideMethods: ['find'] });

export default mongoose.model('Project', projectSchema);
