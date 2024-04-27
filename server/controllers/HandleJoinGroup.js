import GroupChat from "../model/GroupChat.js";

const HandleJoinGroup = async (req, res) => {
    const { id, sender } = req.body;

    try {
        console.log(id);
        const group = await GroupChat.findById(id);

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        if (group.participants.length === 0) {
            group.groupName = "Untitled";
        }

        group.participants.push(sender);
        await group.save();
        
        res.json({ message: "Joined group successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default HandleJoinGroup;
