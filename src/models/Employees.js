import mongoose from "mongoose";

const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { required: true },
  password: { required: true },
});

export default mongoose.model('Employee', employeeSchema);