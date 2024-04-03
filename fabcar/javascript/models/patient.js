const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordOTP: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    credentials: {
        certificate: { type: String },
        privateKey: { type: String }
      },
      mspId: { type: String },
      type: { type: String },
      version: { type: Number },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;