import express from 'express';
import { v4 } from 'uuid';
import { Node } from '../model/node';

const router = express.Router();

//List all nodes
router.get('/', async (req, res) => {
    const nodes = await Node.find({ status: 'publish' }).sort({
        created: 'desc',
    });
    res.send(nodes);
});

//GET by node ID
router.get('/:id', async (req, res) => {
    const node = await Node.findOne({ ID: req.params.id });

    if (!node) return res.status(404).send({ message: 'ID was not found.' });

    res.send(node);
});

//Create new node
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

    res.send({ ID: node.ID, status: 200 });
});

//DELETE node by ID
router.delete('/:id', async (req, res) => {
    const node = await Node.findOneAndDelete({ ID: req.params.id });

    if (!node) return res.status(404).send('ID was not found.');

    res.send(node);
});

//UPDATE by ID
router.put('/:id', async (req, res) => {
    const node = await Node.findOneAndUpdate(
        { ID: req.params.id },
        { name: req.body.name },
        { new: true }
    );

    if (!node) return res.status(404).send('ID was not found.');

    res.send(node);
});

export default router;
