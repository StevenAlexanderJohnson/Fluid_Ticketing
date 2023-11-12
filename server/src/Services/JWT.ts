import jwt from 'jsonwebtoken';
const {sign} = jwt;
import { GetAuthById, UpdateAuthToken } from '../DataAccess/Commands.js';
import Auth from '../Models/Auth.js';

export async function GenerateJWT(user: Auth) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }

    const authUser = await GetAuthById(user._id.toString());
    if (!authUser) {
        throw new Error('User not found');
    }
    const token = sign({ sub: authUser._id, email: authUser.email, role: authUser.role }, secret, { expiresIn: '1h' });
    const refreshToken = Math.random().toString(36).slice(2);

    const updateResponse = await UpdateAuthToken(authUser._id.toString(), refreshToken);
    if (updateResponse.modifiedCount !== 1) {
        throw new Error('Unable to update user token');
    }

    return { token, refreshToken };
}

/**
 * Wrapper function to convert an auth object into user object for the function generateJWT
 * @param authUser Auth object verify the user
 * @returns {Promise<{token: string, refreshToken: string}>} if the access token is valid, otherwise null.
 */
export async function refreshJWT(authUser: Auth) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }

    const user = await GetAuthById(authUser._id.toString());
    if (!user) {
        throw new Error('User not found');
    }

    if (user.access_token !== authUser.access_token || user.access_token_expiration < new Date()) {
        return null;
    }

    return await GenerateJWT(user);
}