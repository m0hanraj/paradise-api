"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const node_1 = require("../model/node");
const validate_1 = __importDefault(require("../middlewares/validate"));
const node_2 = require("../model/node");
const router = express_1.default.Router();
//List all nodes
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nodes = yield node_1.Node.find({ status: 'publish', type: 'node' }).sort({
        created: 'desc',
    });
    res.send(nodes);
}));
//List all projects
router.get('/projects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nodes = yield node_1.Node.find({ type: 'project', status: 'publish' }).sort({
        created: 'desc',
    });
    res.send(nodes);
}));
//Get all node by project
router.get('/projects/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nodes = yield node_1.Node.find({
        parent: req.params.id,
        status: 'publish',
        type: 'node',
    }).sort({
        created: 'desc',
    });
    res.send(nodes);
}));
//GET by node ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const node = yield node_1.Node.findOne({ ID: req.params.id });
    if (!node)
        return res.status(404).send({ message: 'ID was not found.' });
    res.send(node);
}));
//Create new node
router.post('/', (0, validate_1.default)(node_2.nodeSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const { title, type, status, content, metadata, uid, parent } = req.body;
    const { cost, composition, supplement, season, media } = metadata || {};
    let node = new node_1.Node({
        ID: (0, uuid_1.v4)(),
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
            type: metadata === null || metadata === void 0 ? void 0 : metadata.type,
        },
    });
    node = yield node.save();
    res.send({ ID: node.ID, status: 200 });
}));
//DELETE node by ID
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const node = yield node_1.Node.findOneAndDelete({ ID: req.params.id });
    if (!node)
        return res.status(404).send('ID was not found.');
    res.send(node);
}));
// DELETE all nodes
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const node = yield node_1.Node.deleteMany({});
    if (!node)
        return res.status(404).send('ID was not found.');
    res.send(node);
}));
//UPDATE by ID
router.put('/:id', (0, validate_1.default)(node_2.nodeSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const node = yield node_1.Node.findOneAndUpdate({ ID: req.params.id }, {
        title: req.body.title,
        content: req.body.content,
        updated: new Date(),
        metadata: req.body.metadata,
        status: req.body.status,
    }, { new: true });
    if (!node)
        return res.status(404).send('ID was not found.');
    res.send(node);
}));
exports.default = router;
