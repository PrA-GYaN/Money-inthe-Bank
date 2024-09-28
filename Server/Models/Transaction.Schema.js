const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 0
    }
})

const Transaction = mogoose.model("Transaction", transactionSchema)
module.exports = Transaction
