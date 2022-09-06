"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, '/../../logs/access.log'), {
    flags: 'a',
});
const logger = (app) => {
    app.use((0, morgan_1.default)('combined', { stream: accessLogStream }));
};
exports.default = logger;
