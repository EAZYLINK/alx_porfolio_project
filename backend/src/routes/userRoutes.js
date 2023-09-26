import express from 'express';
import {userController} from '../controllers/userController.js';

export const userRouter = express.Router();

userRouter.post('/register', userController.register);