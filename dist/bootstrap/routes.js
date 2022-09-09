"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const node_1 = __importDefault(require("../routes/node"));
const routes = (app) => {
    app.use('/api/nodes', node_1.default);
};
exports.routes = routes;
