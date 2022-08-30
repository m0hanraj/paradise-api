import mongoose from 'mongoose';

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
            type: Array,
        },
        status: {
            type: String,
            required: true,
        },
    })
);
