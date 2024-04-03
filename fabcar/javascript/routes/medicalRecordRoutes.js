// const express = require('express');
// const router = express.Router();
// const medicalRecordController = require('../controllers/medicalRecordController');

// // Create a new medical record
// router.post('/create', medicalRecordController.createMedicalRecord);

// // Retrieve all medical records associated with a specific user
// router.get('/:userId', medicalRecordController.getMedicalRecordsByUser);

// // Retrieve a single medical record by its unique identifier
// router.post('/getpic', medicalRecordController.getMedicalRecordById);

// // Update an existing medical record
// router.put('/:recordId', medicalRecordController.updateMedicalRecord);

// // Delete a medical record by its unique identifier
// router.delete('/:recordId', medicalRecordController.deleteMedicalRecord);



// module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const medicalRecordController = require('../controllers/medicalRecordController');

// Set up multer for file upload
const upload = multer();

router.post('/:patientId/upload', upload.single('file'), medicalRecordController.uploadRecord);
// router.get('/patient/:patientId', medicalRecordController.getAllRecordsByPatient);
// Route to generate a temporary link for accessing patient records
router.get('/generate-link/:patientId', medicalRecordController.generateTemporaryLink);

// Route to access patient records via a temporary link
router.get('/temporary/:token', medicalRecordController.accessTemporaryLink);


module.exports = router;