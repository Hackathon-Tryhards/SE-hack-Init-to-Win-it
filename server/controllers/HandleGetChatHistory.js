import PrivateChat from "../model/PrivateChat.js";
import GroupChat from "../model/GroupChat.js";

const HandleGetChatHistory = async (req, res) => {
    const { chatID, type } = req.body;
    let chat = ""

    try {
        if (type === "group")
            chat = await GroupChat.findById(chatID);
        else
            chat = await PrivateChat.findById(chatID);

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        res.send(chat.messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default HandleGetChatHistory;
