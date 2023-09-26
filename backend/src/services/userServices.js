import { User } from "../models/user.js";


export const userServices = {
    register: async (username, email, hashedPassword ) => {
        const password = hashedPassword
        const user = await User.create({username, email, password })
        return user
    },
    findUser: async (username) => {
        const user = await User.findOne({username})
        return user
    },
    getUserById: async (id) => {
        const user = await User.findById(id)
        return user
    }
}