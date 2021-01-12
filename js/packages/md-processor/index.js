"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mdReader = exports.mdParser = void 0;
const unified_1 = __importDefault(require("unified"));
const remark_parse_1 = __importDefault(require("remark-parse"));
const remark_frontmatter_1 = __importDefault(require("remark-frontmatter"));
const remark_parse_frontmatter_1 = __importDefault(require("remark-parse-frontmatter"));
const unified_fake_compiler_1 = __importDefault(require("../unified-fake-compiler"));
/**
 * A Markdown parser with frontmatter enabled.
 */
exports.mdParser = unified_1.default()
    .use(remark_parse_1.default)
    .use(remark_frontmatter_1.default)
    .use(remark_parse_frontmatter_1.default)
    .freeze();
/**
 * A Markdown reader (parse and transform) with frontmatter enabled.
 */
exports.mdReader = exports.mdParser().use(unified_fake_compiler_1.default).freeze();
