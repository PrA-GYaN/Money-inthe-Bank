require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./Routes/userRoute');
const { connectToDatabase } = require('./Models/model');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', 
}));
app.use(helmet());
const transactionRoutes = require('./Routes/transaction.routes');
const { connectDB } = require('./db/db');

app.use(cors())

console.log(require('dotenv').config())

app.use(express.urlencoded({extendded: true}))



app.use('/api/transaction', transactionRoutes);
app.use('/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB()
});
