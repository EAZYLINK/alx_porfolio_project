import { authServices } from "../services/authServices.js";
import APIError from "../middleware/apiError.js";
import { hashPassword, comparePassword } from "../utils.js";
import { userServices } from "../services/userServices.js";

export const authController = {
    login: async (req, res, next) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return next(APIError.badRequest("Please provide all required fields"));
        }
        try {
            const findUser = await userServices.findUser(username);
            if (!findUser) {
                return next(APIError.notFound("User not found"));
            }
            const isMatch = await comparePassword(password, findUser.password);
            if (!isMatch) {
                return next(APIError.unAuthorized("Invalid credentials"));
            }
            const id = findUser._id;
            const token = await authServices.login( username, id );
            req.headers.authorization = "Bearer " + token
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                token
            })
        } catch (error) {
           return next(APIError.customeError(error.message));
        }
    },

    refreshToken : async (req, res, next) => {
        const { refreshToken} = req.body;
        if (!refreshToken) {
            return next(APIError.badRequest("refreshToken is required"));
        }
        try {
           const decoded = await authServices.decode(refreshToken);
           if (!decoded) {
            return next(APIError.unauthorized("Invalid token"));
              }
            console.log(decoded);
            const payload = {
                username: decoded.username,
                id: decoded.id
            }
            const token = await authServices.refreshToken(payload);
            res.status(200).json({
                success: true,
                message: "New token generated successfully",
                token
            })
        } catch (error) {
           return next(APIError.customeError(error.message));
        }
    }
}