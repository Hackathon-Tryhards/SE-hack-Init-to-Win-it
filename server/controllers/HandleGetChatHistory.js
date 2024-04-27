import PrivateChat from "../model/PrivateChat.js";

const HandleGetChatHistory = async (req, res) => {
    const { chatID } = req.body;

    try {
        const chat = await PrivateChat.findOne({ chat_id: chatID });

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        res.send(chat.messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default HandleGetChatHistory;
