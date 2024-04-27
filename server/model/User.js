import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    photo: {
      data: Buffer,
      contentType: String,
    },
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    interests: {
      type: [String],
      default: [],
    },
    requestSent: {
      type: [String],
      default: [],
    },
    requestReceived: {
      type: [String],
      default: [],
    },
    friends: {
      type: [String],
      default: [],
    },
    goals: [
      {
        goal: {
          type: String,
          required: true,
        },
        time: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

export default User;
