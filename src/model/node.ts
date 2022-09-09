import mongoose from 'mongoose';
import { NodeMeta } from './nodemeta';
import Joi from 'joi';

export const Node = mongoose.model(
    'Node',
    new mongoose.Schema({
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
            type: NodeMeta,
        },
        status: {
            type: String,
            required: true,
        },
        parent: {
            type: String,
        },
    })
);

export const nodeSchema = Joi.object().keys({
    // ID: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }),
    title: Joi.string().required().max(40),
    type: Joi.string().required(),
    content: Joi.string(),
    status: Joi.string().required(),
    uid: Joi.string().required(),
    parent: Joi.string(),
    metadata: Joi.object({
        cost: Joi.number(),
        composition: Joi.string(),
        season: Joi.string(),
        supplement: Joi.string(),
        media: Joi.string(),
        type: Joi.string(),
    }),
});
