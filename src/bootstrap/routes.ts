import express from 'express';
import node from '../routes/node';

export const routes = (app: express.Express) => {
    app.use('/api/node', node);
};
