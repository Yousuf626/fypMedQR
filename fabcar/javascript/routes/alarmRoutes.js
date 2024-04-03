const express = require('express');
const router = express.Router();
const alarmController = require('../controllers/alarmController');

// Create a new alarm
router.post('/create', alarmController.createAlarm);

// Retrieve all alarms associated with a specific user
router.get('/:userId', alarmController.getAlarmsByUser);

// Retrieve a single alarm by its unique identifier
router.get('/:alarmId', alarmController.getAlarmById);

// Update an existing alarm
router.put('/:alarmId', alarmController.updateAlarm);

// Delete an alarm by its unique identifier
router.delete('/:alarmId', alarmController.deleteAlarm);

// Send notifications for active alarms
router.post('/send-notification', alarmController.sendNotification);

module.exports = router;
