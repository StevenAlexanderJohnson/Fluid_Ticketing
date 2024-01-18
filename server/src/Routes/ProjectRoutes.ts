import { Router } from 'express';
import { GetAllProjects, CreateProject, GetProjectById, UpdateProject } from '../DataAccess/Commands.js';
import { Project } from '../Models/Project.js';
import { auth } from '../Services/JWT.js';

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
        const result = await CreateProject(project);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id', async (req, res) => {
    const projectId = req.params.id;

    try {
        const result = await GetProjectById(projectId);
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
    const project = new Project(req.body);

    try {
        const result = await UpdateProject(projectId, project);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;