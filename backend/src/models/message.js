import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    chatroom: {
        type: Schema.Types.ObjectId,
        required: 'chatroom is required',
        ref: 'Chatroom'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: 'user is required',
        ref: 'User'
    },
    message: {
        type: String,
        required: 'message is required'
    },
}, {timestamps: true})

export const Message = model('Message', messageSchema)