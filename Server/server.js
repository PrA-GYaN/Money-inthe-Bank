
require('dotenv').config();
const express = require('express');
<<<<<<< Updated upstream
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
=======

const cors = require('cors');

const app = express()
const transactionRoutes = require('./Routes/transaction.routes');
const { connectDB } = require('./db/db');

app.use(cors())

console.log(require('dotenv').config())

const port = process.env.PORT || 5000;

app.use(express.urlencoded({extendded: true}))
>>>>>>> Stashed changes



app.use('/api/transaction', transactionRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB()
});
