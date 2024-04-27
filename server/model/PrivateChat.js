import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PrivateChatSchema = new Schema(
  {
    chat_id: {
      type: String,
      required: true,
    },
    participants: {
      type: [String],
      default: [],
    },
    messages: {
      type: [
        {
          timestamp: { type: String },
          sender: { type: String },
          content: { type: String },
        },
      ],
      default:[]
    },
  },
  { collection: "privateChats" }
);

const PrivateChat = mongoose.model("PrivateChat", PrivateChatSchema);

export default PrivateChat;
