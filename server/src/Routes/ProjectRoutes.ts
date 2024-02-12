import { Router } from 'express';
import { GetAllProjects, CreateProject, GetProjectById, UpdateProject } from '../DataAccess/Commands.js';
import { Project } from '../Models/Project.js';
import { auth } from '../Services/JWT.js';
import ticketRouter from '../Routes/TicketRoutes.js';

const router = Router();
router.use(auth);

router.get('/', async (req, res) => {
    try {
        const projects = await GetAllProjects(req.companyId);
        res.json(projects);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const project = new Project({...req.body, companyId: req.companyId});
    // Make sure that either the id or name is set
    if (!project.name) {
        res.status(400).send('Project must have a name.');
        return;
    }

    try {
        const result = await CreateProject(req.companyId, project);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.use('/:projectId', async (req, res, next) => {
    try {
        if (!req.params.projectId) {
            res.status(400).send('Project Id is required');
            return;
        }
        req.projectId = req.params.projectId;
        next();
    }
    catch (e) {
        console.error(e)
        res.status(500);
    }
});

router.get('/:id', async (req, res) => {
    const projectId = req.params.id;

    try {
        const result = await GetProjectById(req.companyId, projectId);
        if (!result) {
            res.status(404).send('Project not found');
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
    const projectId = req.params.id;
    const project = new Project({id: req.params.id, ...req.body});

    try {
        const result = await UpdateProject(req.companyId, projectId, project);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.use('/:id/ticket', ticketRouter);

export default router;