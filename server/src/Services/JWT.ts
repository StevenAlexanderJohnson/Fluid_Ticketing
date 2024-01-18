import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Auth from '../Models/Auth.js';
import { GetAuthById, UpdateAuthToken } from '../DataAccess/Commands.js';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
}

export interface AuthPayload {
    email: string,
    exp: number,
    iat: number,
    role: string,
    sub: string,
}
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            console.log('no auth header');
            res.status(401).send('Unauthorized');
            return;
        }
        const token = authHeader!.replace('Bearer ', '');
        if (!token) {
            console.log('no token');
            res.status(401).send('Unauthorized');
            return;
        }

        jwt.verify(token!, jwtSecret, function (err, decoded) {
            if (!decoded) {
                console.log('no decoded')
                res.status(401).send('Unauthorized').end();
                return;
            }
            const payload = decoded as AuthPayload;
            req.auth = new Auth({
                email: payload.email,
                id: payload.sub,
                role: payload.role,
                access_token: token,
                password: '',
                access_token_expiration: new Date(),
                name: ''
            });
            next();
        });
    }
    catch (err) {
        console.log("error occurred in auth middleware", err)
        res.status(401).send('Unauthorized');
    }
}

export function DecodeJWT(token: string) {
    const decoded = jwt.decode(token);
    return decoded;
}

export async function GenerateJWT(payload: Auth) {
    const token = jwt.sign({ sub: payload._id.toString(), email: payload.email, role: payload.role }, jwtSecret!, { expiresIn: '1h' });
    const refreshToken = Math.random().toString(36).substring(2);

    await UpdateAuthToken(payload._id.toString(), refreshToken);

    return { token, refreshToken };
}

export async function RefreshJWT(authUser: Auth) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }

    const user = await GetAuthById(authUser._id);
    if (!user) {
        throw new Error('User not found');
    }

    if (user.access_token !== authUser.access_token) {
        return null;
    }

    return await GenerateJWT(user);
}