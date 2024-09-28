
const { createTransaction, updateTransaction }  = require("../Controller/Transactions.controller")
const express = require("express")


const router = express.Router()

router.post('/create',  createTransaction)
router.get('/complete/:id', updateTransaction)

module.exports = router