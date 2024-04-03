const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: String,
  alarmTime: { 
    type: Date, 
    required: true 
  },
  repeat: {
    type: String,
    enum: ['None', 'Daily', 'Weekly', 'Monthly'], 
    default: 'None'
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  notificationSent: { 
    type: Boolean, 
    default: false 
  },
  lastNotificationTime: Date,
  timeZone: { 
    type: String, 
    default: 'UTC' 
  },
  // Additional fields as per requirements
}, {
  timestamps: true
});

module.exports = mongoose.model('Alarm', alarmSchema);
