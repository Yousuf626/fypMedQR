// const mongoose = require('mongoose');

// const connectDatabase = async () => {
//   try {
//     // Use your actual MongoDB connection URL here
//     const dbURL = 'mongodb://127.0.0.1:27017/MedQR';

//     await mongoose.connect(dbURL, {
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true
//     });

//     console.log('Connected to the database');
//   } catch (error) {
//     console.error('Database connection error:', error);
//   }
// };

// module.exports = connectDatabase;

const mongoose = require('mongoose');
require('dotenv').config();

const connectDatabase = async () => {
  console.log(process.env.MONGODB_URI)
  mongoose.connect(process.env.MONGODB_URI, {
  })
  .then(() => {
      console.log('Connected to database');
  })
  .catch((error) => {
      console.error('Error connecting to database:', error);
  });  
  
};

module.exports = connectDatabase;