const Transaction = async(req, res) => {
    try{
        const { senderId, receivePhone, amount} = req.body 
        console.log(senderId, receivePhone, amount)
        const sender = await Transaction.find(senderId)
        const receiver = await Transaction.findById({phone : receivePhone})
        if(!sender || !receiver){
            return res.status(400).json("Reveiver and sender not found.")
        }
        if(sender.balance< amount){
            return res.status(400).json("Insufficient funds")
        }

        const transaction = new Transaction({
            senderID: sender._id,
        receiverId: revceiver._id,
        amount
        })

        sender.blance -= amount;
        receiver.blanace += amount
        await sender.save()
        await reveiver.send()
        await transaction.save()
        res.status(200).json({message: "completed"})
    }catch(err){
        throw new Error(err.message)
    }
}

module.exports = {Transaction}