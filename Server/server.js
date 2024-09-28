require('dotenv').config();
const express = require('express');

const transactionRoutes = require('./Routes/transaction.routes');

const userRoute = require('./Routes/userRoute');
const { connectDB } = require('./db/db');

const config = require('./Config/config')
const app = express()

app.use(cors())

console.log(require('dotenv').config())

app.use(express.urlencoded({extendded: true}))


app.use(express.json());

app.use('/api/transaction', transactionRoutes);
app.use('/api/user', userRoute)

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
  connectDB()
});
