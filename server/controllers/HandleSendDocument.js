import Doc from "../model/Doc.js";

const HandleSendDocument = async (req, res) => {
    try {
        const docId = req.params.id;
        const doc = await Doc.findById(docId);
        if (!doc) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.send(doc.content);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default HandleSendDocument;