import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  userType: { type: String, required: true }
  // Add other user attributes here
});

export default model('User', UserSchema);
