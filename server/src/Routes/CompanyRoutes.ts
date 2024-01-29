import { Router } from "express";
import { Company } from "../Models/Company.js";
import { auth } from "../Services/JWT.js";
import { CreateCompany, GetCompaniesByUserId, GetCompanyById } from "../DataAccess/Commands.js";

import userRoutes from './UserRoutes.js';
import projectRouter from './ProjectRoutes.js';
import ticketRouter from './TicketRoutes.js';

const router = Router({ mergeParams: true });
router.use(auth);
router.get('/', async (req, res) => {
    try {
        // Get User id from JWT
        const userId = req.auth._id;
        console.log("/", userId);
        const company = await GetCompaniesByUserId(userId.toString());
        if (!company) {
            res.status(404).send('Company not found');
            return;
        }
        res.json(company);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const company = new Company(req.body);
        const result = await CreateCompany(company, req.auth._id);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.use('/:companyId', async (req, res, next) => {
    try {
        if (!req.params.companyId) {
            res.status(400).send('Company id is required');
            return;
        }
        const company = await GetCompanyById(req.params.companyId, req.auth._id.toString());
        if (!company) {
            res.status(404).send('Company not found');
            return;
        }
        req.companyId = req.params.companyId;
        next();
    }
    catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
});
router.use('/:companyId/user', userRoutes);
router.use('/:companyId/project', projectRouter);
router.use('/:companyId/ticket', ticketRouter);

router.get('/:companyId', async (req, res) => {
    try {
        if (!req.params.companyId) {
            res.status(400).send('Company id is required');
            return;
        }
        const userId = req.auth._id;
        const company = await GetCompanyById(req.params.companyId, userId.toString());
        if (!company) {
            res.status(404).send('Company not found');
            return;
        }
        res.json(company);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


export default router;