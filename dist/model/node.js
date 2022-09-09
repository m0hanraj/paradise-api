"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeSchema = exports.Node = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const nodemeta_1 = require("./nodemeta");
const joi_1 = __importDefault(require("joi"));
exports.Node = mongoose_1.default.model('Node', new mongoose_1.default.Schema({
    ID: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        required: true,
    },
    updated: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
    },
    metadata: {
        type: nodemeta_1.NodeMeta,
    },
    status: {
        type: String,
        required: true,
    },
    parent: {
        type: String,
    },
}));
exports.nodeSchema = joi_1.default.object().keys({
    // ID: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }),
    title: joi_1.default.string().required().max(40),
    type: joi_1.default.string().required(),
    content: joi_1.default.string(),
    status: joi_1.default.string().required(),
    uid: joi_1.default.string().required(),
    parent: joi_1.default.string(),
    metadata: joi_1.default.object({
        cost: joi_1.default.number(),
        composition: joi_1.default.string(),
        season: joi_1.default.string(),
        supplement: joi_1.default.string(),
        media: joi_1.default.string(),
        type: joi_1.default.string(),
    }),
});
