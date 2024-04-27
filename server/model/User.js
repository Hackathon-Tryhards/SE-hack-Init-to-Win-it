import mongoose from "mongoose";
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    interests: {
        type: [String],
        required: false
    },
    // request sent received
    // friends
    // photo

},{collection:'users'});

const User = mongoose.model('User', userSchema)

export default User