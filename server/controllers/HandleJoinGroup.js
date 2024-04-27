import GroupChat from "../model/GroupChat.js";

const HandleJoinGroup = async ({chatID,username}) => {
    const id = chatID
    const sender = username

    try {
        console.log(id);
        const group = await GroupChat.findById(id);

        if (!group) {
            return;
        }

        if (group.participants.length === 0) {
            group.groupName = "Untitled";
        }

        group.participants.push(sender);
        await group.save();
        
    } catch (error) {
        console.log(error);
    }
};

export default HandleJoinGroup;
