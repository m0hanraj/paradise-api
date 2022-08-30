import express from 'express';
import * as dotenv from 'dotenv';
import { routes } from './bootstrap/routes.js';
import logger from './bootstrap/logger.js';
import db from './bootstrap/db.js';
import auth from './middlewares/auth.js';

const app = express();
dotenv.config();

app.use(auth);

app.get('/', function (req, res) {
    res.send({ message: 'Welcome to The Paradise 🏞' });
});

db();
logger(app);
routes(app);

const port = process.env.PORT;

export const server = app.listen(port, () =>
    console.log(`Listening on port ${port}...`)
);
