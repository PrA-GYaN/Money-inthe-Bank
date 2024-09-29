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
        res.status(200).json(group);a
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const addUserToGroupByPhone = async (req, res) => {
    const { phone } = req.params; 
    const { groupId } = req.body; 

    try {
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.peoples.includes(user._id)) {
            return res.status(400).json({ message: 'User is already in the group' });
        }
    };

module.exports = {groupCreater,getGroupByName,addUserToGroupByPhone};