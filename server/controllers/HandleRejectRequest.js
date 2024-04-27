import User from "../model/User.js";

const HandleRejectRequest = async (req, res) => {
    const { sender, friend } = req.body;

    try {
        const senderUser = await User.findOne({ username: sender });
        const friendUser = await User.findOne({ username: friend });

        if (!senderUser || !friendUser) {
            return res.status(404).json({ message: "Sender or friend not found" });
        }

        if (!senderUser.requestReceived.includes(friend) || !friendUser.requestSent.includes(sender)) {
            return res.status(400).json({ message: "Friend request not found" });
        }

        senderUser.requestReceived = senderUser.requestReceived.filter(req => req !== friend);
        friendUser.requestSent = friendUser.requestSent.filter(req => req !== sender);

        await senderUser.save();
        await friendUser.save();

        res.json({ message: "Friend request rejected successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default HandleRejectRequest;
