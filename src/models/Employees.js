import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firebaseUid: { type: String, required: true },
});

employeeSchema.plugin(mongooseDelete, { overrideMethods: false });

export default mongoose.model('Employee', employeeSchema);
