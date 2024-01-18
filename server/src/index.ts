import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// Import the routes from other files.
import authRouter from './Routes/AuthRoutes.js';
import companyRouter from './Routes/CompanyRoutes.js';
import Auth from './Models/Auth.js';

// Get the JWT secret from the environment variables.
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
}
else {
    dotenv.config({ path: '.env.development' });
}
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
}

declare global {
    namespace Express {
        export interface Request {
            companyId: string;
            auth: Auth;
        }
    }
}


// Initialize the express app.
const app = express();
const port = 3000;

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5173', 'localhost:5173']
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use('/api/company', companyRouter);
// app.use("/api/user", userRoutes);
// app.use('/api/project', projectRouter);
// app.use('/api/ticket', ticketRouter);

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
