import { Router } from 'express';
import { GetAllUsers, CreateUser, GetUserById } from '../DataAccess/Commands.js';
import User from '../Models/User.js';

const router = Router();

router.get('/', async (_, res) => {
    try {
        const users = await GetAllUsers();
        res.json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const user = new User(req.body);
    if (!user.email) {
        res.status(400).send('User must have an email.');
        return;
    }

    try {
        const result = await CreateUser(user);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
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
        res.status(500).send('Internal Server Error');
    }
});

export default router;