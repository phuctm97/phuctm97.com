"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isParent = exports.getVFileData = exports.toVFile = exports.reader = exports.parser = void 0;
const fs_1 = __importDefault(require("fs"));
const unified_1 = __importDefault(require("unified"));
const remark_parse_1 = __importDefault(require("remark-parse"));
const remark_frontmatter_1 = __importDefault(require("remark-frontmatter"));
const remark_parse_frontmatter_1 = __importDefault(require("remark-parse-frontmatter"));
const unified_fake_compiler_1 = __importDefault(require("../packages/unified-fake-compiler"));
/**
 * Default MDX parser.
 */
exports.parser = unified_1.default()
    .use(remark_parse_1.default)
    .use(remark_frontmatter_1.default)
    .use(remark_parse_frontmatter_1.default)
    .freeze();
/**
 * Default MDX reader (parse and transform).
 */
exports.reader = exports.parser().use(unified_fake_compiler_1.default).freeze();
/**
 * Reads a file and returns it as a `vfile`.
 * @param absPath Absolute path to the file
 */
const toVFile = (absPath) => ({
    cwd: process.cwd(),
    path: absPath,
    contents: fs_1.default.readFileSync(absPath),
});
exports.toVFile = toVFile;
/**
 * Assumes that `file.data` is of a type and returns it.
 * @param file A `vfile`
 */
const getVFileData = (file) => file.data;
exports.getVFileData = getVFileData;
/**
 * Checks if a node is a parent tree (has children).
 * @param node A unist node
 */
const isParent = (node) => !!node.children;
exports.isParent = isParent;
