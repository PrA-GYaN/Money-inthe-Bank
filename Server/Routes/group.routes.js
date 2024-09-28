const {groupCreater,getGroupByName}  = require("../Controller/Group.controller")
const express = require("express")


const router = express.Router()

router.post('/group',groupCreater);
router.get('/groups/name/:group_name', getGroupByName);

module.exports = router