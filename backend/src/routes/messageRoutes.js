import express from 'express';
import { messageController } from '../controllers/messageController.js';
import { verifyToken } from '../middleware/verifyToken.js';

export const messageRouter = express.Router();

messageRouter.post('/', verifyToken,  messageController.sendMessage);
messageRouter.get('/chatroom/:chatroomId', verifyToken,  messageController.getMessageByChatroomId);
messageRouter.get('/', verifyToken, messageController.getAllMessages);
messageRouter.get('/:id', verifyToken, messageController.getMessageById);
messageRouter.delete('/:messageId', verifyToken, messageController.deleteMessage);
messageRouter.put('/:messageId', verifyToken,  messageController.updateMessage);