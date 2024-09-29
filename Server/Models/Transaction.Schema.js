const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    transc_name: {type:String},
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
})

const Transaction = mongoose.model("Transaction", transactionSchema)
module.exports = Transaction
