import express from 'express';
import * as dotenv from 'dotenv';
import { routes } from './bootstrap/routes';
import logger from './bootstrap/logger';
import db from './bootstrap/db';
import auth from './middlewares/auth';
import bodyParser from 'body-parser';

export const app = express();
dotenv.config();

app.use(auth);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send({ message: 'Welcome to The Paradise 🏞' });
});

db();

if (process.env.ENV === 'local') logger(app);

routes(app);

const port = process.env.PORT;

export const server = app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
    server.close();
});
