import GroupChat from '../model/GroupChat.js';
import PrivateChat from '../model/PrivateChat.js';

async function HandleGetDocumentID(req, res) {
    try {
        const { chatID, type } = req.body;
        let chat = {}

        if (type === "dm")
            chat = await PrivateChat.findById(chatID)
        else
            chat = await GroupChat.findById(chatID)

        const docID = chat.docID

        res.send(docID);
    } catch (error) {
        console.error('Error getting group id:', error);
        throw error;
    }
}

export default HandleGetDocumentID;