import { Router } from 'express';
import { GetAllUsers, CreateUser, GetUserById } from '../DataAccess/Commands.js';
import User from '../Models/User.js';

const router = Router();

router.get('/', async (req, resp) => {
    try {
        const users = await GetAllUsers();
        resp.json(users);
    }
    catch (err) {
        console.error(err);
    }
});

router.post('/', async (req, res) => {
    const user = new User(req.body);
    try {
        const result = await CreateUser(user);
        res.json(result);
    }
    catch (err) {
        console.error(err);
    }
});

router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const result = await GetUserById(userId);
        if (!result) {
            res.status(404).send('User not found');
            return;
        }
        res.json(result);
    }
    catch (err) {
        console.error(err);
    }
});

export default router;