<<<<<<< Updated upstream
const {createTransaction,getTransaction}  = require("../Controller/Transactions.controller")
=======
const { createTransaction, updateTransaction }  = require("../Controller/Transactions.controller")
>>>>>>> Stashed changes
const express = require("express")


const router = express.Router()

router.post('/create',  createTransaction)
router.get('/complete/:id', updateTransaction)

module.exports = router