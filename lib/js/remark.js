"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isParent = exports.getVFileData = exports.toVFile = exports.createReader = exports.createParser = exports.fakeCompiler = void 0;
const fs_1 = __importDefault(require("fs"));
const unified_1 = __importDefault(require("unified"));
const remark_parse_1 = __importDefault(require("remark-parse"));
const remark_frontmatter_1 = __importDefault(require("remark-frontmatter"));
const remark_parse_frontmatter_1 = __importDefault(require("remark-parse-frontmatter"));
function fakeCompiler() {
    this.Compiler = () => "";
}
exports.fakeCompiler = fakeCompiler;
const baseParser = unified_1.default().use(remark_parse_1.default).use(remark_frontmatter_1.default).freeze();
const createParser = (schema) => {
    return baseParser().use(remark_parse_frontmatter_1.default, schema).freeze();
};
exports.createParser = createParser;
const createReader = (parser) => parser().use(fakeCompiler).freeze();
exports.createReader = createReader;
const toVFile = (absPath) => ({
    cwd: process.cwd(),
    path: absPath,
    contents: fs_1.default.readFileSync(absPath),
});
exports.toVFile = toVFile;
const getVFileData = (file) => file.data;
exports.getVFileData = getVFileData;
const isParent = (node) => !!node.children;
exports.isParent = isParent;
