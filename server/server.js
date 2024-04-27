import express from 'express'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'
import connectToDB from './services/mongooseService.js'
import loginRouter from './routers/loginRoute.js'
import registerRouter from './routers/registerRoute.js'
import http from "http";
import { Server } from "socket.io";
import uploadRouter from './routers/uploadRoute.js'
import privateChatRouter from './routers/createPrivateChatRouter.js'
import sendRequestRourter from './routers/sendRequestRourter.js'
import rejectRequestRourter from './routers/rejectRequestRouter.js'

const app = express()
const PORT = 3000
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PATCH"],
    },
});

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

function emitChanges(endpoint, payload) {
    io.emit(endpoint, payload);
}

connectToDB()

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/upload', uploadRouter)
app.use('/createPrivateChat',privateChatRouter)
app.use('/sendRequest',sendRequestRourter)
app.use('/rejectRequest',rejectRequestRourter)

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
