import User from "../model/User.js";

const HandleSendRequest = async (req, res) => {
    const { sender, friend } = req.body;
    try {
        const senderUser = await User.findOne({ username: sender });
        const friendUser = await User.findOne({ username: friend });

        if (!senderUser || !friendUser) {
            return res.status(404).json({ message: "Sender or friend not found" });
        }

        if (senderUser.friends.includes(friend) || senderUser.requestSent.includes(friend)) {
            return res.status(400).json({ message: "Friend request already sent or already friends" });
        }

        senderUser.requestSent.push(friend);
        friendUser.requestReceived.push(sender);

        await senderUser.save();
        await friendUser.save();
        req.emitChanges(`requestFor${friend}`, { sender });
        res.json({ message: "Friend request sent successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default HandleSendRequest;
