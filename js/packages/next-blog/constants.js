"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLOG_DIR = void 0;
const path_1 = __importDefault(require("path"));
const next_constants_1 = require("../next-constants");
exports.BLOG_DIR = path_1.default.join(next_constants_1.PAGES_DIR, "blog");
