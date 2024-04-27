import PrivateChat from "../model/PrivateChat"

const HandleCreateChatRoom = async(req,res)=>{
    const {sender,reciver} = req.body;

    let chatId = toLowerCase(sender+reciver);
    res.send(chatId)

}