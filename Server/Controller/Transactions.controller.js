const Transaction = require('../Models/Transaction.Schema')

exports.createTransaction = async(req, res) => {
    const {sender, receiver, amount, status} = req.body
    try{
        const transaction = new Transaction({
            sender, receiver, amount, status
        })
        await transaction.save()
        res.status(201).json(transaction)
    }catch(err){
        throw new Error(err.message)
    }
}

exports.getTransaction = async(req, res) => {
    const userId = req.user._id
    try{
        const transactions = await Transaction.find({$or: [{sender: userId}, {receiver: userId}],}).populate('sender receiver', 'username, email')
        res.status(200),json(transactions)
    }catch(error){
        throw new Error(error.message)
    }
}