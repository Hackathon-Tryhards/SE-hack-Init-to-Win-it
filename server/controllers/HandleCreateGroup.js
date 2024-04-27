import GroupChat from "../model/GroupChat.js";

const HandleCreateGroup = async (req, res) => {
    try {
        const newGroupChat = new GroupChat({
            participants: [],
            messages: []
        });

        const group = await newGroupChat.save();
        res.json({ _id: group._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default HandleCreateGroup;
