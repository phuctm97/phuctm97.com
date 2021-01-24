"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBlog = exports.readOne = void 0;
const unified_1 = __importDefault(require("unified"));
const read_base_1 = require("../../utils/content/read-base");
const preset = require("../../unified/presets/read-blog");
const processor = unified_1.default().use(preset);
const readOne = (filepath) => read_base_1.readOne(filepath, processor);
exports.readOne = readOne;
const readBlog = () => read_base_1.readMultiple("blog/**/*.mdx", processor);
exports.readBlog = readBlog;
