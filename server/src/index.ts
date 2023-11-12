import express from 'express';
import bodyParser from 'body-parser';
import { expressjwt } from 'express-jwt';
import dotenv from 'dotenv';
// Import the routes from other files.
import baseRoutes from './Routes/BaseRoutes.js';
import userRoutes from './Routes/UserRoutes.js';
import authRouter from './Routes/AuthRoutes.js';

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

app.use(
    expressjwt({
        secret: jwtSecret,
        algorithms: ['HS256']
    })
        .unless({
            path: [
                '/api/auth/login',
                '/api/auth/register',
                '/api/auth/refresh',
                '/api/auth/logout'
            ]
        })
)

app.use("/", baseRoutes);
app.use("/api/auth", authRouter);
app.use("/api/user", userRoutes);

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
