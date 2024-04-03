const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
  credentials: {
    certificate: { type: String },
    privateKey: { type: String }
  },
  mspId: { type: String },
  type: { type: String },
  version: { type: Number },
//  Add other user-related fields (e.g., address, phone number, etc.) as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User
