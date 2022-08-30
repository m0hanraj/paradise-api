import express from 'express';
import { v4 } from 'uuid';
import { Node } from '../model/node.js';

const router = express.Router();

router.get('/', async (req, res) => {
    res.send({ name: 'Hello', date: new Date() });
});

router.post('/', async (req, res) => {
    let node = new Node({
        ID: v4(),
        type: 'tree',
        name: 'Neem tree',
        created: new Date(),
        updated: new Date(),
        status: 'publish',
        content: 'Lorem ipsum',
        metadata: {
            cost: 20,
            composition: '3:1:1 - Soil, Sand and Straw',
            supplement: 'limestone, neem oil',
            season: 'Winter - ஆடி',
        },
    });
    node = await node.save();

    res.send(node);
});

export default router;
