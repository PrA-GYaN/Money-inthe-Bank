const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./Route/userRoute');
const { connectToDatabase } = require('./Model/model');

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', 
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
