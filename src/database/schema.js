import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  phone: {
    type: String,
    default: ''
  },
  avatarUrl: {
    type: String,
    default: ''
  }
}, { timestamps: true });

const UserModel = model('Users', userSchema);

export default UserModel;
