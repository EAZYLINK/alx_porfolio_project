import { chatroomServices } from "../services/chatroomServices.js";
import APIError from "../middleware/apiError.js";

export const chatroomController = {
    createChatroom: async (req, res, next) => {
        const { name} = req.body;
        if (!name) {
            return next(APIError.badRequest("Room name is required"));
        }
        try {
            const { id } = req.user;
            const findRoom = await chatroomServices.getChatroomByName(name);
            if (findRoom) {
                return next(APIError.badRequest("User already exists"));
            }
            const chatroom = await chatroomServices.createChatroom(name, id);
            res.status(200).json({ 
                success: true,
                message: "Chatroom created successfully",
                chatroom
             });
        } catch (error) {
            next(APIError.customeError(error.message))
        }
    },
    getAllChatrooms: async (req, res, next) => {
        try {
            const chatrooms = await chatroomServices.getAllChatrooms();
            res.status(200).json({
                success: true,
                message: "All chatrooms",
                chatrooms
            })
        } catch (error) {
            console.log(error);
            next(APIError.customeError(error.message))
        }
    },
    getChatroomById: async (req, res, next) => {
        try {
        const { id } = req.params;
        if (!id) {
            return next(APIError.badRequest("Chatroom id is required"));
        }
            const chatroom = await chatroomServices.getChatroomById(id);
            res.status(200).json({
                success: true,
                message: "Chatroom found",
                chatroom
            })
        } catch (error) {
          next(APIError.customError(error.message))
        }
    }
}