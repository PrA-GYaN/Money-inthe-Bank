require('dotenv').config();
const express = require('express');
const transactionRoutes = require('./Routes/transaction.routes');

const userRoute = require('./Routes/userRoute');
const { connectDB } = require('./db/db');

const config = require('./Config/config')
const app = express()

app.use(express.json());

app.use('/api/transaction', transactionRoutes);
app.use('/api/user', userRoute)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
  connectDB()
});
