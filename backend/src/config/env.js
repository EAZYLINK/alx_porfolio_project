import dotenv from 'dotenv';
dotenv.config();

export const env = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    REFRESH_SECRET: process.env.REFRESH_SECRET,
    MONGODB_URI: process.env.MONGODB_URI
};