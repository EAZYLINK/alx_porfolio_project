import { userServices } from "../services/userServices.js";
import APIError from "../middleware/apiError.js";
import { hashPassword, comparePassword } from "../utils.js";

export const userController = {
    register: async (req, res, next) => {
        const { username, password, email } = req.body;
        console.log(email)
        if (!username || !password || !email) {
            return next(APIError.invalidRequest("Please provide all required fields"));
        }
        try {
            const hashedPassword = await hashPassword(password);
            const user = await userServices.register( username, email, hashedPassword );
            res.status(200).json({
                success: true,
                message: "User registered successfully"
            })
        } catch (error) {
           return next(APIError.customeError(error.message));
        }
    },
    findUser: async (req, res, next) => {
        const { username } = req.params;
        try {
            const user = await userServices.findUser(username);
            if (!user) {
                return next(APIError.notFound("User not found"));
            }
            res.status(200).json({
                success: true,
                message: "User found successfully",
                data: user
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}