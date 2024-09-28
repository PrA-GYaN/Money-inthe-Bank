const mongoose = require("mongoose")
const { Schema } = mongoose;
const groupschema = new mongoose.Schema({
    group_name: String,
    peoples: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    transactions:  [
        {
            type: Schema.Types.ObjectId,
            ref: "Transaction",
        },
    ]
})

const Group = mongoose.model("Group", groupschema)
module.exports = Group;
