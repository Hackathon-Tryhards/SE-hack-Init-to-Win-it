import GroupChat from '../model/GroupChat.js';

async function HandleGetDocumentID(req, res) {
    try {
        const { chatID } = req.body;
        const group = await GroupChat.findById(chatID)
        const docID = group.docID

        res.send(docID);
    } catch (error) {
        console.error('Error getting group id:', error);
        throw error;
    }
}

export default HandleGetDocumentID;