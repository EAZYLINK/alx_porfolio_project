import express from 'express'
import { connectDB } from './src/config/db.js'
import {env} from './src/config/env.js'
import {errorHandler, notFound} from './src/middleware/errorHandler.js'
import { authRouter } from './src/routes/authRoutes.js'
import { userRouter } from './src/routes/userRoutes.js'
import { chatroomRouter } from './src/routes/chatroomRoutes.js'
import { messageRouter } from './src/routes/messageRoutes.js'
import { Server } from 'socket.io'
import http from 'http'
import APIError from './src/middleware/apiError.js'
import cors from 'cors'
import { authServices } from './src/services/authServices.js'
import { userServices } from './src/services/userServices.js'
import { messageServices } from './src/services/messageServices.js'
import { chatroomServices } from './src/services/chatroomServices.js'

const {PORT, MONGODB_URI} = env


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to our Chat API!"
    })
})

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/chatrooms', chatroomRouter)
app.use('/api/messages', messageRouter)

app.use(notFound)
app.use(errorHandler)



server.listen(PORT, async () => {
    await connectDB(MONGODB_URI)
    console.log(`Server is running on port ${PORT}`)
   
})


io.use(async(socket, next) => {
    try {
        const token = socket.handshake.query.token
        const payload = await authServices.decode(token, env.JWT_SECRET);
        if (!payload) {
            return next(APIError.unAuthorized('You are not authorized to access this route')
            );
        }
        socket.userId = payload.id;
        next();
    } catch (error) {
        console.log(error)
        next(APIError.unAuthorized('You are not authorized to access this route')
        );
    }
}
)

io.on('connection', (socket) => {
    console.log('Connected: ' + socket.userId);
    socket.on('disconnect', () => {
        console.log('Disconnected: ' + socket.userId);
    })

    socket.on("joinRoom", async({ chatroomId }) => {
        socket.join(chatroomId);
        const chatroom =  await chatroomServices.getChatroomById(chatroomId);
        if (chatroom) {
            const findUser = await userServices.getUserById(socket.userId);
            socket.to(chatroomId).emit("newUserJoined", {
                userId: socket.userId,
                name: findUser.username
            })
        }
    })

    socket.on("leaveRoom", ({ chatroomId }) => {
        socket.leave(chatroomId);
        console.log("A user left chatroom: " + chatroomId)
    })

    socket.on("chatroomMessage", async ({chatroomId, message}) => {
        if (message.trim().length > 0) {
            const findUser = await userServices.getUserById(socket.userId);
            const newMessage =   await messageServices.createMessage(chatroomId, socket.userId, message);
            io.to(chatroomId).emit("newMessage", {
                data: newMessage,
                name: findUser.username,
                userId: socket.userId
            })
            console.log("Message sent to chatroom: " + chatroomId)
        }
    })
})