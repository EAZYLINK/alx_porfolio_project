import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: 'name is required'
    },
    password:{
        type: String,
        required: 'password is required'
    },
    email: {
        type: String,
        required: 'email is required'
    },
    refreshToken: {
        type: String,
    }
}, {timestamps: true})

export const User = model('User', userSchema)