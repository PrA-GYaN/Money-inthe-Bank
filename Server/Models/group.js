const mongoose = require("mongoose")

const groupschema = new mongoose.Schema({
    group_name: String,
    peoples: String,
    transactions:  [
        {
            type: Schema.Types.ObjectId,
            ref: "Transaction",
        },
    ]
})

const Group = mogoose.model("Group", groupschema)
module.exports = Group;
