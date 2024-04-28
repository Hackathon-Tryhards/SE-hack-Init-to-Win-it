import PrivateChat from "../model/PrivateChat.js";
import GroupChat from "../model/GroupChat.js";
import User from "../model/User.js";

const HandleGetUserChat = async (req, res) => {
  const { sender } = req.body;

  try {
    const privateChats = await PrivateChat.find({ participants: sender }).select("-messages");
    const groupChats = await GroupChat.find({ participants: sender }).select("-messages");

    const privateChatData = await Promise.all(privateChats.map(async (chat) => {
      const otherParticipant = chat.participants.find(participant => participant !== sender);
      const otherUser = await User.findOne({ username: otherParticipant });
      const photo = otherUser.photo
      return {
        _id: chat._id,
        name: otherParticipant,
        lastMessage: chat.lastMessage,
        timestamp: chat.timestampOfLastMessage,
        type: "private",
        avatar: photo
      };
    }));

    const groupChatData = groupChats.map(chat => ({
      _id: chat._id,
      name: chat.groupName,
      lastMessage: chat.lastMessage,
      timestamp: chat.timestampOfLastMessage,
      type: "group",
      avatar: ""
    }));

    const chats = privateChatData.concat(groupChatData);
    
    res.json({ chats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default HandleGetUserChat;
