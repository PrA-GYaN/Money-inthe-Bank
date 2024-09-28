const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    fromUser: { type: String, ref: 'User' },
    toUser: { type: String, ref: 'User' },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
})

const Transaction = mongoose.model("Transaction", transactionSchema)
module.exports = Transaction
