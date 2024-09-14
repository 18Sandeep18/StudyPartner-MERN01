const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/user');

const app = express();

// CORS configuration for specific origin
const allowedOrigins = ['https://studypartner-sandeep-mern.vercel.app/'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Middleware to parse JSON
app.use(express.json());

// Log requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);

// Database connection and server start
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB, server is listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });