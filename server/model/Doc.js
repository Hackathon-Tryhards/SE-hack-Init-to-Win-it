import mongoose from "mongoose";

const docSchema = new mongoose.Schema(
    {
        content: {
            type: String,
        },
    },
    {
        collection: "docs",
    }
);

const Doc = mongoose.model("Doc", docSchema);
export default Doc;
