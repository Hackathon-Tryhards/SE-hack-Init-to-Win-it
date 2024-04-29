import fs from 'fs';
import bcrypt from "bcrypt";
import PrivateChat from "../model/PrivateChat.js";
import GroupChat from "../model/GroupChat.js";
import User from "../model/User.js";

const defaultPhotoPath = './images/test.png';
let defaultPhoto = null;

fs.readFile(defaultPhotoPath, (err, fileData) => {
    if (err) {
        console.error('Error reading photo from local storage:', err);
    } else {
        defaultPhoto = {
            data: fileData, // Set the buffer data of the image
            contentType: 'image/png' // Set the appropriate MIME type (for example, image/jpeg)
        };
    }
});

const handleLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).send({ message: "Enter Username and Password!" });

    try {
        const user = await User.findOne({ username });

        if (!user) return res.status(404).send({ message: "User not found" });

        const result = await bcrypt.compare(password, user.password);

        if (!result) return res.status(401).send({ message: "Incorrect password" });

        const privateChats = await PrivateChat.find({
            participants: username,
        }).select("-messages");
        const groupChats = await GroupChat.find({ participants: username }).select(
            "-messages"
        );

        const privateChatData = await Promise.all(
            privateChats.map(async (chat) => {
                const otherParticipant = chat.participants.find(
                    (participant) => participant !== username
                );
                const otherUser = await User.findOne({ username: otherParticipant });
                const photo = otherUser.photo;
                return {
                    _id: chat._id,
                    name: otherParticipant,
                    lastMessage: chat.lastMessage,
                    timestamp: chat.timestampOfLastMessage,
                    type: "dm",
                    photo: photo ? photo : defaultPhoto,
                };
            })
        );

        const groupChatData = groupChats.map((chat) => ({
            _id: chat._id,
            name: chat.groupName,
            lastMessage: chat.lastMessage,
            timestamp: chat.timestampOfLastMessage,
            type: "group",
            photo: chat.photo ? chat.photo : defaultPhoto,
        }));

        const chats = privateChatData.concat(groupChatData);

        console.log(typeof chats);

        res.status(200).send({
            message: "Login successful",
            photo: user.photo,
            username: user.username,
            name: user.name,
            email: user.email,
            interests: user.interests,
            friends: user.friends,
            requestSent: user.requestSent,
            requestReceived: user.requestReceived,
            chats: chats
        });
    } catch (err) {
        console.error("Error during login: ", err);
        return res.status(500).send({ message: "Error during login" });
    }
};

export default handleLogin;