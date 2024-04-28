import PrivateChat from "../model/PrivateChat.js";

const HandleGetChatIDByUsername = async (req, res) => {
    try {
        const { username, friendUsername } = req.body;
        console.log(username, friendUsername);

        let pc = await PrivateChat.findOne({}, { participants: [username, friendUsername]});

        console.log(pc)

        if (!pc) {
            pc = await PrivateChat.findOne({}, { participants: [friendUsername, username]});
        }

        if (!pc) {
            res.status(404).json({ message: "Chat not found" });
        }

        res.send(pc._id);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default HandleGetChatIDByUsername;
