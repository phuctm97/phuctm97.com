"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reader = exports.parser = void 0;
const unified_1 = __importDefault(require("unified"));
const remark_parse_1 = __importDefault(require("remark-parse"));
const remark_frontmatter_1 = __importDefault(require("remark-frontmatter"));
const remark_parse_frontmatter_1 = __importDefault(require("remark-parse-frontmatter"));
const compile_nothing_1 = __importDefault(require("../../utils/unified/compile-nothing"));
/**
 * A MDX parser with frontmatter enabled.
 */
exports.parser = unified_1.default()
    .use(remark_parse_1.default)
    .use(remark_frontmatter_1.default)
    .use(remark_parse_frontmatter_1.default)
    .freeze();
/**
 * A MDX reader (parse and transform) with frontmatter enabled.
 */
exports.reader = exports.parser().use(compile_nothing_1.default).freeze();
