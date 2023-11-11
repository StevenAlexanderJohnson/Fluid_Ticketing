import {Router} from 'express';

const baseRouter = Router();
baseRouter.get("/", (req, res) => res.send("Hello World!"));

export default baseRouter;