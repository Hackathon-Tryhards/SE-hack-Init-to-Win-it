import User from "../model/User.js";

const HandleFriend = async (req, res) => {
    const { activity, sender, friend } = req.body;

    try {
        const senderUser = await User.findOne({ username: sender });
        const friendUser = await User.findOne({ username: friend });

        if (!senderUser || !friendUser) {
            return res.status(404).json({ message: "Sender or friend not found" });
        }

        if (activity === "add") {
            if (!senderUser.requestReceived.includes(friend) || !friendUser.requestSent.includes(sender)) {
                return res.status(400).json({ message: "Friend request not found" });
            }

            senderUser.requestReceived = senderUser.requestReceived.filter(req => req !== friend);
            friendUser.requestSent = friendUser.requestSent.filter(req => req !== sender);

            senderUser.friends.push(friend);
            friendUser.friends.push(sender);

            await senderUser.save();
            await friendUser.save();

            res.json({ message: "Friend added successfully" });
        } else if (activity === "remove") {
            if (!senderUser.friends.includes(friend) || !friendUser.friends.includes(sender)) {
                return res.status(400).json({ message: "Friend not found" });
            }

            senderUser.friends = senderUser.friends.filter(fr => fr !== friend);
            friendUser.friends = friendUser.friends.filter(fr => fr !== sender);

            await senderUser.save();
            await friendUser.save();

            res.json({ message: "Friend removed successfully" });
        } else {
            return res.status(400).json({ message: "Invalid activity" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default HandleFriend;
