const {createTransaction,getTransaction}  = require("../Controller/Transactions.controller")
const express = require("express")


const router = express.Router()

router.post('/create',createTransaction )
router.get('/get', getTransaction)

module.exports = router