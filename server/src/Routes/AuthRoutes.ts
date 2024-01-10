import { Router } from 'express';
import { Request, Response } from 'express';
import Auth from '../Models/Auth.js';
import { CreateUserAuth, GetAuthByEmailPass } from '../DataAccess/Commands.js';
import { GenerateJWT, RefreshJWT } from '../Services/JWT.js';
import { ObjectId } from 'mongodb';

const router = Router();

router.post('/login', async (req, res) => {
    try {
        const authUser = new Auth(req.body);
        const user = await GetAuthByEmailPass(authUser.email, authUser.password);
        if (!user) {
            return res.status(401).send('Invalid Username and Password');
        }
        authUser._id = user._id;
        res.json(await GenerateJWT(authUser));
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
});

router.post('/register', async (req, res) => {
    try {
        const authUser = new Auth(req.body);
        const user = await GetAuthByEmailPass(authUser.email, authUser.password);
        if (user) {
            return res.status(409).send('User already exists');
        }
        const registerResponse = await CreateUserAuth(authUser);
        if (registerResponse.acknowledged !== true) {
            return res.status(500).send('Unable to register user');
        }
        authUser._id = registerResponse.insertedId;
        const { token, refreshToken } = await GenerateJWT(authUser);
        res.setHeader("Set-Cookie", [`refreshToken=${refreshToken}; HttpOnly; Secure; Path=/; Max-Age=${60 * 60 * 24 * 30}`])
        .json({ token, refreshToken });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
});

router.post(
    '/refresh',
    async (req: Request, res: Response) => {
        try {
            const body = req.body;
            if (!body) {
                return res.status(400).send('Bad Request');
            }

            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).send('Unauthorized');
            }
            const redirect = body.redirect;
            if (!body.redirect) {
                return res.status(400).send('Bad Request');
            }
            if (!body.user) {
                return res.status(400).send('Bad Request');
            }

            const token = await RefreshJWT({ _id: new ObjectId(body.user), access_token: refreshToken } as Auth);
            if (!token) {
                return res.status(401).send('Unauthorized');
            }

            res.header('Set-Cookie', [`refreshToken=${token.refreshToken}; HttpOnly; Secure; Path=/; Max-Age=${60 * 60 * 24 * 30}`])// 30 days
                .json({ token: token.token, redirect: redirect });
        }
        catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });

export default router;