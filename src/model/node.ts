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
        name: {
            type: String,
            required: true,
        },
        type: {
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
    })
);

export const nodeSchema = Joi.object().keys({
    // ID: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }),
    name: Joi.string().required().max(40),
    type: Joi.string().required(),
    created: Joi.date().required(),
    updated: Joi.date().required(),
    content: Joi.string(),
    status: Joi.string(),
    metadata: Joi.object({
        cost: Joi.number(),
        composition: Joi.string(),
        season: Joi.string(),
        supplement: Joi.string(),
    }),
});
