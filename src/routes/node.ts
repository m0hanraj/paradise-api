import express, { Request, Response } from 'express';
import { v4 } from 'uuid';
import { Node } from '../model/node';
import { NodeType } from '../interfaces/node';
import validate from '../middlewares/validate';
import { nodeSchema } from '../model/node';

const router = express.Router();

//List all nodes
router.get('/', async (req: Request, res: Response) => {
    const nodes = await Node.find({ status: 'publish' }).sort({
        created: 'desc',
    });
    res.send(nodes);
});

//GET by node ID
router.get('/:id', async (req: Request, res: Response) => {
    const node = await Node.findOne({ ID: req.params.id });

    if (!node) return res.status(404).send({ message: 'ID was not found.' });

    res.send(node);
});

//Create new node
router.post('/', validate(nodeSchema), async (req: Request, res: Response) => {
    const date: Date = new Date();
    const { type, name, status, content, metadata }: NodeType = req.body;
    const { cost, composition, supplement, season } = metadata;
    let node = new Node({
        ID: v4(),
        type,
        name,
        created: date,
        updated: date,
        status,
        content,
        metadata: {
            cost,
            composition,
            supplement,
            season,
        },
    });
    node = await node.save();

    res.send({ ID: node.ID, status: 200 });
});

//DELETE node by ID
router.delete('/:id', async (req: Request, res: Response) => {
    const node = await Node.findOneAndDelete({ ID: req.params.id });

    if (!node) return res.status(404).send('ID was not found.');

    res.send(node);
});

//UPDATE by ID
router.put('/:id', async (req: Request, res: Response) => {
    const node = await Node.findOneAndUpdate(
        { ID: req.params.id },
        { name: req.body.name },
        { new: true }
    );

    if (!node) return res.status(404).send('ID was not found.');

    res.send(node);
});

export default router;
