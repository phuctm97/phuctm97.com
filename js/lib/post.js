"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBlog = exports.postIsntNil = exports.getBlogFiles = exports.readPost = exports.postExporter = void 0;
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const to_vfile_1 = __importDefault(require("to-vfile"));
const unist_is_parent_1 = __importDefault(require("../packages/unist-is-parent"));
const mdx_with_frontmatter_1 = require("../packages/mdx-with-frontmatter");
const unified_parser_1 = __importDefault(require("../packages/next-blog/unified-parser"));
const next_constants_1 = require("../packages/next-constants");
const BLOG_DIR = path_1.default.join(next_constants_1.PAGES_DIR, "blog");
/**
 * A unified/remark plugin that exports `post` from a _parsed_ MDX blog post for dynamic rendering (if applicable).
 */
const postExporter = () => (tree, file) => {
    const { post } = file.data;
    if (!post)
        return file.message("Not a post, skip.");
    if (!unist_is_parent_1.default(tree))
        return file.fail("Tree is empty.");
    tree.children.push({
        type: "export",
        value: `export const post = ${JSON.stringify(post)};`,
    });
};
exports.postExporter = postExporter;
/**
 * Reads a blog post from a file.
 * @param absPath Absolute path to the blog post's file
 */
const readPost = (absPath) => {
    const file = mdx_with_frontmatter_1.reader().use(unified_parser_1.default).processSync(to_vfile_1.default.readSync(absPath));
    const { post } = file.data;
    return post;
};
exports.readPost = readPost;
/**
 * Lists all blog posts' filenames (absolute paths).
 */
const getBlogFiles = () => glob_1.default.sync("**/*.mdx", {
    cwd: BLOG_DIR,
    absolute: true,
});
exports.getBlogFiles = getBlogFiles;
/**
 * Checks if a post is not nil (`null` or `undefined`).
 * @param val A nullable blog post
 */
const postIsntNil = (val) => !!val;
exports.postIsntNil = postIsntNil;
/**
 * Reads all blog posts in chronological order.
 */
const readBlog = () => exports.getBlogFiles()
    .map(exports.readPost)
    .filter(exports.postIsntNil)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
exports.readBlog = readBlog;
