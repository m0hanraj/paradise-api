import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '/../../logs/access.log'),
    {
        flags: 'a',
    }
);

const logger = (app: express.Express) => {
    app.use(morgan('combined', { stream: accessLogStream }));
};

export default logger;
