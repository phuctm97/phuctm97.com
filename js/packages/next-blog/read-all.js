"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const to_vfile_1 = __importDefault(require("to-vfile"));
const mdx_with_frontmatter_1 = require("../mdx-with-frontmatter");
const not_nil_1 = __importDefault(require("../../utils/lang/not-nil"));
const unified_parser_1 = __importDefault(require("../next-blog/unified-parser"));
const constants_1 = require("../next-blog/constants");
const readOne = (absPath) => {
    const file = mdx_with_frontmatter_1.reader().use(unified_parser_1.default).processSync(to_vfile_1.default.readSync(absPath));
    const { post } = file.data;
    return post;
};
/**
 * Reads all blog posts in chronological order.
 */
function readAllBlog() {
    return glob_1.default
        .sync("**/*.mdx", {
        cwd: constants_1.BLOG_DIR,
        absolute: true,
    })
        .map(readOne)
        .filter(not_nil_1.default)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}
exports.default = readAllBlog;
