const User = require('../models/User'); 
const Transaction = require('../models/Transaction'); 

const transferFunds = async (req, res) => {
    try {
        const { senderId, receivePhone, amount } = req.body;
        console.log(senderId, receivePhone, amount);

        // Find sender by ID and receiver by phone number
        const sender = await User.findById(senderId);  // Use the User model to find sender
        const receiver = await User.findOne({ phone: receivePhone });  // Use the User model to find receiver by phone

        if (!sender || !receiver) {
            return res.status(400).json("Receiver or sender not found.");
        }

        if (sender.balance < amount) {
            return res.status(400).json("Insufficient funds.");
        }

        // Create a new transaction
        const transaction = new Transaction({
            senderId: sender._id,
            receiverId: receiver._id,
            amount
        });

        // Update balances
        sender.balance -= amount;
        receiver.balance += amount;

        // Save the updated sender and receiver
        await sender.save();
        await receiver.save();

        // Save the transaction
        await transaction.save();

        res.status(200).json({ message: "Transaction completed successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { transferFunds };
