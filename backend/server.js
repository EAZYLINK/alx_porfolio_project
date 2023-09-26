import express from 'express'
import { connectDB } from './src/config/db.js'
import {env} from './src/config/env.js'
import {errorHandler, notFound} from './src/middleware/errorHandler.js'
import { authRouter } from './src/routes/authRoutes.js'
import { userRouter } from './src/routes/userRoutes.js'
import { chatroomRouter } from './src/routes/chatroomRoutes.js'
import { Server } from 'socket.io'
import http from 'http'
import APIError from './src/middleware/apiError.js'
import cors from 'cors'

const {PORT, MONGODB_URI} = env


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app)
const io = new Server(server)

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
app.use(notFound)
app.use(errorHandler)



server.listen(PORT, async () => {
    await connectDB(MONGODB_URI)
    console.log(`Server is running on port ${PORT}`)
   
})


io.use(async(socket, next) => {
    try {
        const token = socket.handshake.query.token
        const payload = await verifyToken(token, process.env.JWT_SECRET);
        socket.userId = payload.id;
        next();
    } catch (error) {
        next(APIError.Unauthorized('You are not authorized to access this route')
        );
    }
}
)

io.on('connection', (socket) => {
    console.log('Connected: ' + socket.userId);
    socket.on('disconnect', () => {
        console.log('Disconnected: ' + socket.userId);
    })
})