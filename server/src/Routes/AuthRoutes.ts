import { Router } from 'express';
import { Request, Response } from 'express';
import Auth from '../Models/Auth.js';
import { CheckEmailExists, CreateUserAuth, GetAuthByEmailPass } from '../DataAccess/Commands.js';
import { GenerateJWT, RefreshJWT } from '../Services/JWT.js';
import { ObjectId } from 'mongodb';

const router = Router();

router.post('/login', async (req, res) => {
    try {
        const authUser = new Auth(req.body);
        if (!authUser.email || !authUser.password) {
            return res.status(400).send('Bad Request');
        }
        const user = await GetAuthByEmailPass(authUser.email, authUser.password);
        if (!user) {
            return res.status(401).send('Invalid Username and Password');
        }
        authUser._id = user._id;
        const { token: access_token, refreshToken } = await GenerateJWT(authUser);
        res.status(200).send(new Auth({ name: user.name, access_token: access_token, refresh_token: refreshToken}));
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
});

router.post('/signup', async (req, res) => {
    try {
        const authUser = new Auth(req.body);
        if (!authUser.email || !authUser.password) {
            return res.status(400).send('Bad Request');
        }
        const user = await CheckEmailExists(authUser.email);
        if (user) {
            return res.status(409).send('User already exists');
        }
        if (authUser.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/) === null) {
            console.log(authUser.password, "invalid password");
            return res.status(400).send('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
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