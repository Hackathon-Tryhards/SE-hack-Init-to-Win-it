import PrivateChat from "../model/PrivateChat.js";
import User from "../model/User.js";

const HandleCreatePrivateChatRoom = async (req, res) => {
    const { sender, receiver } = req.body;

    try {
        const senderUser = await User.findOne({ username: sender });
        const receiverUser = await User.findOne({ username: receiver });

        if (!senderUser || !receiverUser) {
            return res.status(404).json({ message: "Sender or receiver not found" });
        }

        if (!senderUser.friends.includes(receiver) || !receiverUser.friends.includes(sender)) {
            return res.status(403).json({ message: "Sender and receiver are not friends" });
        }

        let chatId = (sender + receiver).toLowerCase();
        let existingChat = await PrivateChat.findOne({ chat_id: chatId });

        if (existingChat) {
            return res.json(existingChat);
        }

        let chatId2 = (receiver+sender).toLowerCase();
        let existingChat2 = await PrivateChat.findOne({ chat_id: chatId2 });

        if(existingChat2){
            return res.json(existingChat2);
        }

        const newChat = new PrivateChat({
            chat_id: chatId,
            participants: [sender, receiver],
            messages: []
        });

        await newChat.save();
        res.json(newChat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default HandleCreatePrivateChatRoom;
