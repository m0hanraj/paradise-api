"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const routes_1 = require("./bootstrap/routes");
// import logger from './bootstrap/logger';
const db_1 = __importDefault(require("./bootstrap/db"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.app = (0, express_1.default)();
dotenv.config();
exports.app.use(auth_1.default);
// parse application/x-www-form-urlencoded
exports.app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
exports.app.use(body_parser_1.default.json());
exports.app.get('/', function (req, res) {
    res.send({ message: 'Welcome to The Paradise 🏞' });
});
(0, db_1.default)();
// if (process.env.ENV === 'local') logger(app);
(0, routes_1.routes)(exports.app);
const port = process.env.PORT;
exports.server = exports.app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
