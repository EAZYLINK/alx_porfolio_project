import { Schema, model } from "mongoose";

const chatroomSchema = new Schema({
    name: {
        type: String,
        required: 'name is required'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'User ID is required'
    },
}, {timestamps: true})

export const Chatroom = model('Chatroom', chatroomSchema)