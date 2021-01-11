"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const rootDir = process.cwd();
/**
 * Absolute paths to various Next.js directories.
 */
const dir = {
    root: rootDir,
    public: path_1.default.join(rootDir, "public"),
    pages: path_1.default.join(rootDir, "pages"),
};
exports.default = dir;
