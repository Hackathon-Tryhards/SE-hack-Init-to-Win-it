import PrivateChat from "../model/PrivateChat.js";
import GroupChat from "../model/GroupChat.js";

const HandleGetUserChat = async (req, res) => {
    const { sender } = req.body;

    try {
        const privateChats = await PrivateChat.find({ participants: sender }).select("chat_id");
        const groupChats = await GroupChat.find({ participants: sender }).select("_id");

        const chatIds = privateChats.map(chat => chat.chat_id).concat(groupChats.map(chat => chat._id));
        
        res.json({ chatIds: chatIds });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default HandleGetUserChat;
