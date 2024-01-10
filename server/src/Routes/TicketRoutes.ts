import { Router } from 'express';
import { GetAllTickets, CreateTicket, GetTicketById, UpdateTicket, GetProjectById } from '../DataAccess/Commands.js';
import { Ticket } from '../Models/Ticket.js';
import { auth } from '../Services/JWT.js';

const router = Router();
router.use(auth);

router.get('/', async (_, res) => {
    try {
        const tickets = await GetAllTickets();
        res.json(tickets);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const ticket = new Ticket(req.body);
    // Make sure that either the id or name is set
    if (!ticket.name) {
        res.status(400).send('Ticket must have a name.');
        return;
    }

    if (!ticket.projectId) {
        res.status(400).send('Ticket must have a projectId.');
        return;
    }

    try {
        const project = await GetProjectById(ticket.projectId.toString());
        if (!project) {
            res.status(404).send('Project not found');
            return;
        }
        const result = await CreateTicket(ticket);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id', async (req, res) => {
    const ticketId = req.params.id;

    try {
        const result = await GetTicketById(ticketId);
        if (!result) {
            res.status(404).send('Ticket not found');
            return;
        }
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.patch('/:id', async (req, res) => {
    const ticketId = req.params.id;
    const ticket = new Ticket(req.body);

    try {
        const result = await UpdateTicket(ticketId, ticket);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;