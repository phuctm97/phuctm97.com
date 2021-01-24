"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readMultiple = exports.readOne = void 0;
const glob_1 = __importDefault(require("glob"));
const unified_1 = __importDefault(require("unified"));
const to_vfile_1 = __importDefault(require("to-vfile"));
const server_1 = require("../../constants/server");
const defaultPreset = require("../../unified/presets/read-default");
const defaultProcessor = unified_1.default().use(defaultPreset);
const readOne = (filepath, processor = defaultProcessor) => {
    const { data } = processor.processSync(to_vfile_1.default.readSync(filepath));
    return data;
};
exports.readOne = readOne;
const readMultiple = (pattern, processor = defaultProcessor) => {
    return glob_1.default
        .sync(pattern, { cwd: server_1.PAGES_DIR, absolute: true })
        .map((filepath) => exports.readOne(filepath, processor));
};
exports.readMultiple = readMultiple;
