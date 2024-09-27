const express = require('express');
const { app, server } = require("./socket/socket.js");
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./Routes/userRoutes');
const messageRoutes = require('./Routes/message.routes');
const { connectToDatabase } = require('./Model/model'); // Adjusted import

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', // For production, specify allowed origins
}));
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
});
app.use(limiter);

connectToDatabase().catch(error => {
  console.error("Failed to connect to the database:", error);
  process.exit(1);
});

app.use('/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
