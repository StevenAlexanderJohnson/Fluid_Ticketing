import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// Import the routes from other files.
import userRoutes from './Routes/UserRoutes.js';
import authRouter from './Routes/AuthRoutes.js';
import projectRouter from './Routes/ProjectRoutes.js';
import ticketRouter from './Routes/TicketRoutes.js';

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

// Initialize the express app.
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRoutes);
app.use('/api/project', projectRouter);
app.use('/api/ticket', ticketRouter);

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
