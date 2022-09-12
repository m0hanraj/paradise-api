import express, { Request, Response } from 'express';
import { v4 } from 'uuid';
import { Node } from '../model/node';
import { NodeType } from '../interfaces/node';
import validate from '../middlewares/validate';
import { nodeSchema } from '../model/node';

const router = express.Router();

//List all nodes
router.get('/', async (req: Request, res: Response) => {
    const nodes = await Node.find({ status: 'publish', type: 'node' }).sort({
        created: 'desc',
    });
    res.send(nodes);
});

//List all projects
router.get('/projects', async (req: Request, res: Response) => {
    const nodes = await Node.find({ type: 'project', status: 'publish' }).sort({
        created: 'desc',
    });
    res.send(nodes);
});

//Get all node by project
router.get('/projects/:id', async (req: Request, res: Response) => {
    const nodes = await Node.find({
        parent: req.params.id,
        status: 'publish',
        type: 'node',
    }).sort({
        created: 'desc',
    });
    res.send(nodes);
});

//Get all revision by node
router.get('/revisions/:id', async (req: Request, res: Response) => {
    const nodes = await Node.find({
        parent: req.params.id,
        status: 'publish',
        type: 'revision',
    }).sort({
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
    const { title, type, status, content, metadata, uid, parent }: NodeType =
        req.body;
    const { cost, composition, supplement, season, media } = metadata || {};
    let node = new Node({
        ID: v4(),
        title,
        type,
        created: date,
        updated: date,
        uid,
        parent,
        status,
        content,
        metadata: {
            cost,
            composition,
            supplement,
            season,
            media,
            type: metadata?.type,
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

// DELETE all nodes
// router.delete('/', async (req: Request, res: Response) => {
//     const node = await Node.deleteMany({});

//     if (!node) return res.status(404).send('ID was not found.');

//     res.send(node);
// });

//UPDATE by ID
router.put(
    '/:id',
    validate(nodeSchema),
    async (req: Request, res: Response) => {
        const node = await Node.findOneAndUpdate(
            { ID: req.params.id },
            {
                title: req.body.title,
                content: req.body.content,
                updated: new Date(),
                metadata: req.body.metadata,
                status: req.body.status,
            },
            { new: true }
        );

        if (!node) return res.status(404).send('ID was not found.');

        res.send(node);
    }
);

export default router;
