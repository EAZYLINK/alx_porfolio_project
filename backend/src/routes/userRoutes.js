import express from 'express';
import {userController} from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';

export const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.get('/:id', verifyToken, userController.getUserById)
userRouter.get('/:username', verifyToken, userController.findUser)
userRouter.get('/', verifyToken, userController.getAllUsers)