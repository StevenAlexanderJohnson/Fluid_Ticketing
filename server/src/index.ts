import express from 'express';
import bodyParser from 'body-parser';
// Import the routes from other files.
import baseRoutes from './Routes/BaseRoutes.js';
import userRoutes from './Routes/UserRoutes.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/", baseRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
