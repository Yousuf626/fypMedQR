// const mongoose = require('mongoose')

// const medicalRecordSchema = new mongoose.Schema({
//   // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   // recordType: { type: String, required: true }, // e.g., diagnosis, prescription
//   // date: { type: Date, default: Date.now },
//   // uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Store the user who uploaded the record
//   fileUrl: { type: String }, // Path or URL of the uploaded file
//   email:{type:String},

//   // Add other relevant fields for the medical record (e.g., doctor's notes, lab results, etc.)
// });

// module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    length: {
        type: Number,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    }
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

module.exports = MedicalRecord;