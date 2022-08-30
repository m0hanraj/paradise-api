import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '/../logs/access.log'),
    {
        flags: 'a',
    }
);
app.use(morgan('combined', { stream: accessLogStream }));

const port = process.env.PORT;

console.log('port', port);

app.get('/', function (req, res) {
    res.send('hello, world!');
});

export const server = app.listen(port, () =>
    console.log(`Listening on port ${port}...`)
);
