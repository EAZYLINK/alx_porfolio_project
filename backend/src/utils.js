import bcryptjs from 'bcryptjs';

export const hashPassword=async (password) => {
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    return hashedPassword
}

export const comparePassword=async (password, hashedPassword) => {
    const isMatch = await bcryptjs.compare(password, hashedPassword);
    return isMatch
}

