import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GroupChatSchema = new Schema(
  {
    
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
    },
  },
  { collection: "groupChats" }
);

const GroupChat = mongoose.model("GroupChat", GroupChatSchema);

export default GroupChat;
