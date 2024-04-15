const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true,
    },
  credentials: {
    certificate: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
  },
  mspId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: 'X.509',
  },
  // Optional fields for enhanced security and auditing
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;