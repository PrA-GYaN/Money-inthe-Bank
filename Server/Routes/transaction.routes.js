const {Transaction}  = require("../Controller/Transaction")
const express = require("express")


const router = express.Router()

router.post('/payment',Transaction )

module.exports = router