import { messageServices } from "../services/messageServices.js";
import APIError from '../middleware/apiError.js'

export const messageController = {
    sendMessage: async (req, res, next) => {
       try {
         const {chatroomId, userId, message} = req.body
        if (!chatroomId || !userId || !message) {
            return next(APIError.badRequest('Missing required parameters'))
        }
        const newMessage = await messageServices.createMessage(chatroomId, userId, message)
        res.status(201).json(
            {
                success: true,
                message: 'Message sent successfully',
                data: newMessage
            }
        )       
       } catch (error) {
              next(APIError.customError(error.message))
       }
       },
    getAllMessages: async (req, res, next) => {
        try {
            const {chatroomId} = req.params
            const messages = await messageServices.getAllMessages()
            res.status(200).json(
                {
                    success: true,
                    message: 'Messages retrieved successfully',
                    data: messages
                }
            )       
           } catch (error) {
                  next(APIError.customError(error.message))
           }
        },
    getMessageByChatroomId: async (req, res, next) => {
        try {
            const {chatroomId} = req.params
            if (!chatroomId) {
                return next(APIError.badRequest('Missing required parameters'))
            }
            const messages = await messageServices.getMessagesByChatroomId(chatroomId)
            res.status(200).json(
                {
                    success: true,
                    message: 'Messages retrieved successfully',
                    data: messages
                }
            )       
           } catch (error) {
                  next(APIError.customError(error.message))
           }
        },
    getMessageById: async (req, res, next) => {
        try {
            const {messageId} = req.params
            if (!messageId) {
                return next(APIError.badRequest('Missing required parameters'))
            }
            const message = await messageServices.getMessageById(messageId)
            res.status(200).json(
                {
                    success: true,
                    message: 'Message retrieved successfully',
                    data: message
                }
            )    
           } catch (error) {
                  next(APIError.customError(error.message))
           }
        },
    deleteMessage: async (req, res, next) => {
        try {
            const {messageId} = req.params
            if (!messageId) {
                return next(APIError.badRequest('Missing required parameters'))
            }
            const deletedMessage = await messageServices.deleteMessageById(messageId)
            res.status(200).json(
                {
                    success: true,
                    message: 'Message deleted successfully',
                    data: deletedMessage
                }
            )    
           } catch (error) {
                  next(APIError.customError(error.message))
           }
        },
    updateMessage: async (req, res, next) => {
        try {
            const {messageId} = req.params
            const {message} = req.body
            if (!messageId || !message) {
                return next(APIError.badRequest('Missing required parameters'))
            }
            const updatedMessage = await messageServices.updateMessageById(messageId, message)
            res.status(200).json(
                {
                    success: true,
                    message: 'Message updated successfully',
                    data: updatedMessage
                }
            )    
           } catch (error) {
                  next(APIError.customError(error.message))
           }
        }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      