import GroupChat from "../model/GroupChat.js";
import Doc from "../model/Doc.js";

const HandleCreateGroup = async (req, res) => {
    try {
        const doc = new Doc();
        await doc.save();

        const newGroupChat = new GroupChat({
            participants: [],
            messages: [],
            docID: doc._id,
        });

        const group = await newGroupChat.save();
        res.json({ _id: group._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default HandleCreateGroup;
