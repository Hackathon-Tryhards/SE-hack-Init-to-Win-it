import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GroupChatSchema = new Schema(
  {
    groupName:{
        type:String
    },
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
      default:[]
    },
    timestampOfLastMessage:{
        type:String,
        default:"1970-01-01T00:00:00.000Z"
    },
    lastMessage:{
        type:String,
        default:""
    }
  },
  { collection: "groupChats" }
);

const GroupChat = mongoose.model("GroupChat", GroupChatSchema);

export default GroupChat;
