import { Router } from 'express';
import Auth from '../Models/Auth.js';
import { CreateUserAuth, GetAuthByEmailPass } from '../DataAccess/Commands.js';
import { GenerateJWT } from '../Services/JWT.js';

const router = Router();

router.post('/login', async (req, res) => {
    try {
        const authUser = new Auth(req.body);
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
        const {token, refreshToken} = await GenerateJWT(authUser);
        res.setHeader("Set-Cookie", [`refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 30}`]); // 30 days
        res.json({token, refreshToken});
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
});

export default router;