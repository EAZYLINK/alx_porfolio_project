import { Chatroom } from "../models/chatRoom.js";

export const chatroomServices = {
    createChatroom: async (name, id) => {
        const chatroom = new Chatroom({ name, userId: id });
        await chatroom.save();
        return chatroom;
    },
    getAllChatrooms: async () => {
        const chatrooms = await Chatroom.find({});
        return chatrooms;
    },
    getChatroomById: async (id) => {
        const chatroom = await Chatroom.findById(id);
        return chatroom;
    },
    getChatroomByName: async (name) => {
        const chatroom = await Chatroom.findOne({ name });
        return chatroom;
    },
    updateChatroomNameById: async (id, name) => {
        const updatedRoomName = await Chatroom.findByIdAndUpdate(id, { name });
        return updatedRoomName;
    },
    deleteChatroomById: async (id) => {
        const deletedChatroom = await Chatroom.findByIdAndDelete(id);
        return deletedChatroom;
    },
}