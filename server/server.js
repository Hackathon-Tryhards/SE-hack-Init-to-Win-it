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
import handleFriendRourter from './routers/friendRoute.js'
import getChatHistoryRourter from './routers/getChatHistoryRoute.js'
import PrivateChat from './model/PrivateChat.js'
import createGroupRouter from './routers/createGroupRouter.js'
import HandleJoinGroup from './controllers/HandleJoinGroup.js'
import GroupChat from './model/GroupChat.js'
import getUserChatRouter from './routers/getUserChatRouter.js'
import getAllUsersRouter from './routers/getAllUsersRouter.js'
import openAIRAGAgentRouter from './routers/openAIRagAgentRourter.js'
import geminiRAGAgentRouter from './routers/geminiRAGAgentRouter.js'
import generelOpenAIRouter from './routers/generelOpenAIRouter.js'
import generelGeminiRouter from './routers/generelGeminiRouter.js'
import sendDocumentRouter from './routers/sendDocumentRouter.js'
import addGoalRourter from './routers/addGoalRourter.js'
import removeGoalRourter from './routers/removeGoalRouter.js'
import getAllGoalsRourter from './routers/getAllGoals.js'
import getDocumentIDRouter from './routers/getDocumentIDRouter.js'
import summaryRouter from './routers/summaryRourter.js'
import Doc from './model/Doc.js'

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

    socket.on("join_group_chat", (data) => {
        HandleJoinGroup(data)
        console.log(`User: ${data.username} joined room: ${data.chatID}`);
    });

    socket.on("send_group_message", async (data) => {
        const group_room = await GroupChat.findById(data.chatID)
        console.log("group_room", group_room);
        const messages = {
            timestamp: data.message.timestamp,
            author: data.message.author,
            content: data.message.content
        }
        group_room.messages.push(messages)
        group_room.timestamp = messages.timestamp
        group_room.lastMessage = messages.content
        await group_room.save();

        console.log(data.chatID);

        socket.emit(`receive_group_message_${data.chatID}`, data.message);

    });

    socket.on("send_message_private", async (data) => {
        const private_room = await PrivateChat.findOne({ chat_id: data.chatID })
        const messages = {
            timestamp: data.message.timestamp,
            author: data.message.author,
            content: data.message.content
        }
        private_room.messages.push(messages)
        await private_room.save();
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on('edit', (data) => {
        io.emit(`updateContent${data.docID}`, data.content);
    });

    socket.on('save', async (data) => {
        try {
            if (!data.docID) {
                throw new Error("Invalid document ID");
            }
            
            const doc = await Doc.findById(data.docID);
            
            if (!doc) {
                console.log(`Document with ID ${data.docID} not found.`);
                return; // Exit early
            }
    
            // Update document content
            doc.content = data.content;
            await doc.save();
    
            console.log(`Document with ID ${data.docID} updated successfully.`);
        } catch (error) {
            console.error('Error saving document:', error);
        }
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

function emitChanges(endpoint, payload) {
    io.emit(endpoint, payload);
}

connectToDB()

app.use((req, res, next) => {
    req.emitChanges = emitChanges;
    req.io = io;
    next();
});
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/upload', uploadRouter)
app.use('/createPrivateChat', privateChatRouter)
app.use('/sendRequest', sendRequestRourter)
app.use('/sendDocument', sendDocumentRouter)
app.use('/rejectRequest', rejectRequestRourter)
app.use('/friend', handleFriendRourter)
app.use('/getChatHistory', getChatHistoryRourter)
app.use('/createGroup', createGroupRouter)
app.use('/getUserChats', getUserChatRouter)
app.use('/getAllUsers', getAllUsersRouter)
app.use('/getDocumentID', getDocumentIDRouter)
app.use('/solveDoubtOpenAI', openAIRAGAgentRouter)
app.use('/solveDoubtGemini', geminiRAGAgentRouter)
app.use('/solveGenerelOpenAI', generelOpenAIRouter)
app.use('/solveGenerelGemini', generelGeminiRouter)
app.use('/addGoal',addGoalRourter)
app.use('/removeGoal',removeGoalRourter)
app.use('/getAllGoals',getAllGoalsRourter)
app.use('/getSummary',summaryRouter)

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
