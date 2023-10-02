import Jwt  from "jsonwebtoken";
import { User } from "../models/user.js";
import {env} from '../config/env.js'

export const authServices = {
    login: async (username, id) => {
        const payload = {
            username,
            id
        }
        const token = Jwt.sign(payload, env.JWT_SECRET, {expiresIn: '1hr'})
        const refreshToken = Jwt.sign(payload, env.REFRESH_SECRET, {expiresIn: '1d'})
        await User.findOneAndUpdate({username}, {refreshToken})
        return token
    },
    decode: async (token, secret) => {
        try {
        const decoded = Jwt.verify(token, secret)
        return decoded
        } catch (error) {
            return false
        }
    },
    refreshToken: async (payload) => {
        const newToken = Jwt.sign(payload, env.JWT_SECRET, {expiresIn: '1h'})
        return newToken
    }
}