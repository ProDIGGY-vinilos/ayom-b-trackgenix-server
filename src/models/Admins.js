import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;

const adminSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firebaseUid: { type: String, required: true },
});

adminSchema.plugin(mongooseDelete, { overrideMethods: ['find'] });

export default mongoose.model('Admin', adminSchema);
