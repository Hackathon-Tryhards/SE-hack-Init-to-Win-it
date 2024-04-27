import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PrivateChatSchema = new Schema(
  {
    participants: {
      type: [String],
      default: [],
    },
    messages: {
      type: [
        {
          timestamp: { type: String },
          author: { type: String },
          content: { type: String },
        },
      ],
      default: []
    },
    timestampOfLastMessage: {
      type: String,
      default: "1970-01-01T00:00:00.000Z"
    },
    lastMessage: {
      type: String,
      default: ""
    },
    docID: {
      type: mongoose.Schema.ObjectId,
      ref: "Doc",
    },
  },
  { collection: "privateChats" }
);

const PrivateChat = mongoose.model("PrivateChat", PrivateChatSchema);

export default PrivateChat;
