"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLIC_DIR = exports.PAGES_DIR = exports.ROOT_DIR = void 0;
const path_1 = __importDefault(require("path"));
exports.ROOT_DIR = process.cwd();
exports.PAGES_DIR = path_1.default.join(exports.ROOT_DIR, "pages");
exports.PUBLIC_DIR = path_1.default.join(exports.ROOT_DIR, "public");
