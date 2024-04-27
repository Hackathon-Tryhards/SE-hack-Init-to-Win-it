import express from 'express'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'
import connectToDB from './services/mongooseService.js'
import loginRouter from './routers/loginRoute.js'
import registerRouter from './routers/registerRoute.js'
import http from "http";
import { Server } from "socket.io";
import uploadRouter from './routers/uploadRoute.js'

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
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

function emitChanges(endpoint, payload) {
    io.emit(endpoint,  payload );
}

connectToDB()

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/upload',uploadRouter)

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
