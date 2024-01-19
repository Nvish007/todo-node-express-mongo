
const express = require('express');
const mongoose = require('mongoose');
const firebaseAdmin = require('firebase-admin');
const app = express();
// require('dotenv').config();

// Configure Express middleware, parsers, etc.

// Connect to MongoDB
// mongoose.connect('mongodb://username:password@localhost:27017/todo-list', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const mongoURI = 'mongodb://127.0.0.1:27017/todo-list';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Initialize Firebase Admin SDK
// const serviceAccount = require('./path/to/your/firebase/serviceAccountKey.json');
// firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(serviceAccount),
//   // Add any other Firebase configurations if needed
// });

// Import and use routes
const authRoutes = require('./src/routes/authRoutes');
app.use('/auth', authRoutes);

// Add more routes as needed

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
