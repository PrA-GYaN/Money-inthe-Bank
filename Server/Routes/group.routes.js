const {group}  = require("../Controller/Group")
const express = require("express")


const router = express.Router()

router.post('/group',group)

module.exports = router