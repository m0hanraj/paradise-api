import mongoose from 'mongoose';

export const NodeMeta = new mongoose.Schema(
    {
        cost: {
            type: Number,
        },
        season: {
            type: String,
        },
        composition: {
            type: String,
        },
        supplement: {
            type: String,
        },
        media: {
            type: String,
        },
    },
    { _id: false }
);
