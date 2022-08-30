import express from 'express';
import { v4 } from 'uuid';
import { Node } from '../model/node.js';

const router = express.Router();

router.get('/', async (req, res) => {
    res.send({ name: 'Hello', date: new Date() });
});

router.post('/', async (req, res) => {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let node = new Node({
        ID: v4(),
        type: 'tree',
        name: 'Neem tree',
        created: new Date(),
        updated: new Date(),
        status: 'publish',
        content: 'Lorem ipsum',
        metadata: ['media', '/conent/url.jpg'],
    });
    node = await node.save();

    res.send(node);
});

export default router;
