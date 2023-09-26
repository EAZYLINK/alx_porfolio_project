import {chatroomController} from '../controllers/chatroomController.js';
import {verifyToken} from '../middleware/verifyToken.js';
import express from 'express';

export const chatroomRouter = express.Router();

chatroomRouter.post('/', verifyToken, chatroomController.createChatroom);
chatroomRouter.get('/', verifyToken, chatroomController.getAllChatrooms);
chatroomRouter.get('/:id', verifyToken, chatroomController.getChatroomById);