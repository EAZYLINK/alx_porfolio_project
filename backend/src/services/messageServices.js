import {Message} from '../models/message.js'


export const messageServices = {
    createMessage: async (chatroomId, userId, message) => {
        const newMessage = await Message.create({chatroom: chatroomId, user: userId, message})
        return newMessage
    },
    getAllMessages: async () => {
        const messages = await Message.find({})
        return messages
    },
    getMessageById: async (id) => {
        const message = await Message.findById(id)
        return message
    },
    getMessagesByChatroom: async (chatroomId) => {
        const messages = await Message.find({chatroom: chatroomId})
        return messages
    },
    deleteMessageById: async (id) => {
        const deletedMessage = await Message.findByIdAndDelete(id)
        return deletedMessage
    },
    deleteAllMessages: async () => {
        const deletedMessages = await Message.deleteMany({})
        return deletedMessages
    },
    updateMessageById: async (id, message) => {
        const updatedMessage = await Message.findByIdAndUpdate(id, {message})
        return updatedMessage
    }
}