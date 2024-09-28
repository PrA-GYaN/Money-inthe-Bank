const Transaction = require('../Models/Transaction.Schema')
const Users = require("../Models/Users")
exports.createTransaction = async (req, res) => {
    try {
        const { fromUser, toUser, amount } = req.body;

        // Find sender and receiver
        const sender = await Users.findById(fromUser);
        const receiver = await Users.findById(toUser);
        if(fromUser === toUser){
            return res.status(400).json({ message: 'Cannot transfer to the same user' });
        }
        if (!sender || !receiver) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Create a new transaction
        const transaction = new Transaction({
            fromUser: sender._id,
            toUser: receiver._id,
            amount,
        });

        await transaction.save();

        res.status(201).json({ message: 'Transaction created', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

}

exports.updateTransaction = async (req, res) => {

    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        transaction.status = 'completed';
        await transaction.save();

        res.status(200).json({ message: 'Transaction completed', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

