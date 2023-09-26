import {Message} from '../models/message.js'


export const messageServices = {
    createMessage: async (chatroomId, userId, message) => {
        const newMessage = await Message.create({chatroom: chatroomId, user: userId, message})
        return newMessage
    }
}