"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMeta = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.NodeMeta = new mongoose_1.default.Schema({
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
}, { _id: false });
