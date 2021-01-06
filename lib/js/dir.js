"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const pagesDir = path_1.default.join(process.cwd(), "pages");
const dir = {
    pages: pagesDir,
    blog: path_1.default.join(pagesDir, "blog"),
};
exports.default = dir;
