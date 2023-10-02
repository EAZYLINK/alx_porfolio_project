import APIError from "../middleware/apiError.js";
import { authServices } from "../services/authServices.js";
import { env } from "../config/env.js";


export const verifyToken = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return next(APIError.badRequest("Authorization header is required"));
    }
    try {
    const token = authorization.split(" ")[1];
    if (!token) {
        return next(APIError.badRequest("Token is required"));
    }
        const decoded = await authServices.decode(token, env.JWT_SECRET);
        if (!decoded) {
            return next(APIError.unAuthorized("you need to login first"));
        }
        req.user = decoded;
        next();
    } catch (error) {
        next(APIError.customeError(error.message));
    }
}