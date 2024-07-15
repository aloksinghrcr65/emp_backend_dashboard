const express = require('express');
const connectDB = require('./config/db');
const ErrorHandler = require('./utilities/error-handling');

const userRoutes = require('./routes/userRoutes');
const empRoutes = require('./routes/empRoutes');
const courseRoutes = require('./routes/courseRoutes')
const vendorRoutes = require('./routes/vendorRoutes');


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000

// Connect to MongoDB
connectDB;

// Routes
app.use('/user', userRoutes);
app.use('/auth', empRoutes);
app.use('/vendors', vendorRoutes);
app.use('/course', courseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(ErrorHandler.Internal_Server_Error('Something went wrong'));
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});