

const HandleStoreChatHistory = async(req,res)=>{
    io.on("connection", (socket) => {
        console.log("A user connected");
        socket.on("join_room", (data) => {
            socket.join(data);
            console.log(`User with ID: ${socket.id} joined room: ${data}`);
        });
    
        socket.on("send_message", (data) => {
            socket.to(data.room).emit("receive_message", data);
        });
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });          
}