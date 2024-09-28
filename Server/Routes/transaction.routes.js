const express = require("express");
const { createTransaction, getTransaction } = require("../Controller/Transactions.controller");

const router = express.Router();

// Route for transferring funds
router.post('/transfer', createTransaction);

// Route for completing a transaction
router.get('/get-transaction', getTransaction);



module.exports = router;
