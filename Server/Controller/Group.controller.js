const Group = require('../Models/Group.Schema');

const groupCreater =async(req,res)=>{
    const {group_name} = req.body;
    try{
        peoples = [];
        transactions = [];
        console.log(group_name);
        const group = new Group({
            group_name,peoples,transactions
        })
        await group.save()
        res.status(201).json(group)
    }catch(err){
        throw new Error(err.message)
    }
};

const getGroupByName = async (req, res) => {
    const { group_name } = req.params;

    try {
        console.log("Group requested" + group_name);
        const group = await Group.findOne({ group_name }).populate('transactions');
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.status(200).json(group);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = {groupCreater,getGroupByName}