const Alarm = require('../models/alarm');
const nodemailer = require('nodemailer');

// Create a new alarm
const createAlarm = async (req, res) => {
  try {
    const { userId, title, description, alarmTime, repeat, timeZone } = req.body;

    const alarm = new Alarm({
      userId,
      title,
      description,
      alarmTime,
      repeat,
      timeZone,
    });

    await alarm.save();
    res.status(201).json({ message: 'Alarm created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create alarm' });
  }
};

// Retrieve all alarms associated with a specific user
const getAlarmsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const alarms = await Alarm.find({ userId });

    res.status(200).json({ alarms });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve alarms' });
  }
};

// Retrieve a single alarm by its unique identifier
const getAlarmById = async (req, res) => {
  try {
    const alarmId = req.params.alarmId;
    const alarm = await Alarm.findById(alarmId);

    if (!alarm) {
      return res.status(404).json({ error: 'Alarm not found' });
    }

    res.status(200).json({ alarm });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve alarm' });
  }
};

// Update an existing alarm
const updateAlarm = async (req, res) => {
  try {
    const alarmId = req.params.alarmId;
    const { title, description, alarmTime, repeat, timeZone, isActive } = req.body;
    const updatedAlarm = await Alarm.findByIdAndUpdate(
      alarmId,
      { title, description, alarmTime, repeat, timeZone, isActive },
      { new: true }
    );

    if (!updatedAlarm) {
      return res.status(404).json({ error: 'Alarm not found' });
    }

    res.status(200).json({ message: 'Alarm updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update alarm' });
  }
};

// Delete an alarm by its unique identifier
const deleteAlarm = async (req, res) => {
  try {
    const alarmId = req.params.alarmId;
    const deletedAlarm = await Alarm.findByIdAndDelete(alarmId);

    if (!deletedAlarm) {
      return res.status(404).json({ error: 'Alarm not found' });
    }

    res.status(200).json({ message: 'Alarm deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete alarm' });
  }
};

// Send notifications for active alarms
const sendNotification = async (req, res) => {
  try {
    // Implement the logic to send notifications here
    // You can use libraries like nodemailer, push notifications, or other notification services

    // Example: Sending an email notification
    const { userId, title, alarmTime } = req.body;

    // Configure your email service (e.g., Gmail) here
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password',
      },
    });

    // Define email data
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: 'recipient-email@example.com',
      subject: `Alarm: ${title}`,
      text: `It's time for your alarm: ${title} at ${alarmTime}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Email sending failed:', error);
        res.status(500).json({ error: 'Failed to send notification' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Notification sent successfully' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send notification' });
  }
};

module.exports = {
  createAlarm,
  getAlarmsByUser,
  getAlarmById,
  updateAlarm,
  deleteAlarm,
  sendNotification,
};
