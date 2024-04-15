// // Import necessary modules and dependencies
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// // Initialize Express.js
// const app = express();

// // Import and use middleware (e.g., bodyParser for parsing JSON)
// app.use(bodyParser.json());

// // // Import the database configuration
// // const db = require('./config/database'); // You may need to adjust the path

// // db.connectDatabase;


// //connect database:
// try {
//   // Use your actual MongoDB connection URL here
//   const dbURL = 'mongodb://127.0.0.1:27017/MedQR';

//   mongoose.connect(dbURL, {
//   //   useNewUrlParser: true,
//   //   useUnifiedTopology: true
//   });

//   console.log('Connected to the database');
// } catch (error) {
//   console.error('Database connection error:', error);
// }



// // Import and use routes
// const userRoutes = require('./routes/userRoutes');
// const medicalRecordRoutes = require('./routes/medicalRecordRoutes');
// const alarmRoutes = require('./routes/alarmRoutes');



// app.use('/users', userRoutes);
// app.use('/medical-records', medicalRecordRoutes);
// app.use('/alarms', alarmRoutes);

// // Set up the server to listen on a port
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const patientRoutes = require('./routes/patientRoutes');
const medicalRecordRoutes = require('./routes/medicalRecordRoutes');
const cors = require('cors');


const app = express();
app.use(cors());
// Middleware
app.use(bodyParser.json());

// Import the connectDatabase function from the database file
const connectDatabase = require('./config/database');

// Define an async function to use await
const initializeDatabase = async () => {
    try {
        await connectDatabase();
        console.log('Database connection successful');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

// Call the async function
initializeDatabase();



// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/medical-records', medicalRecordRoutes); // Include medical record routes

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});