import express from 'express';
import { messageController } from '../controllers/messageController.js';
import { verifyToken } from '../middleware/verifyToken.js';

export const messageRouter = express.Router();

messageRouter.post('/', verifyToken,  messageController.sendMessage);
messageRouter.get('/:chatroomId', verifyToken,  messageController.getMessages);
messageRouter.get('/', verifyToken, messageController.getMessages);
messageRouter.get('/:userId', verifyToken, messageController.getMessageById);
messageRouter.delete('/:messageId', verifyToken, messageController.deleteMessage);
messageRouter.put('/:messageId', verifyToken,  messageController.updateMessage);