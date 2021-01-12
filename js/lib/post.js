"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBlog = exports.postIsntNil = exports.getBlogFiles = exports.readPost = exports.postExporter = exports.postParser = exports.generatePostCover = void 0;
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const url_1 = require("url");
const unist_util_select_1 = require("unist-util-select");
const mdast_util_to_string_1 = __importDefault(require("mdast-util-to-string"));
const revalidator_1 = __importDefault(require("revalidator"));
const to_vfile_1 = __importDefault(require("to-vfile"));
const unist_is_parent_1 = __importDefault(require("../packages/unist-is-parent"));
const mdx_with_frontmatter_1 = require("../packages/mdx-with-frontmatter");
const is_post_1 = __importDefault(require("../packages/next-blog/is-post"));
const get_url_1 = __importDefault(require("../packages/next-blog/get-url"));
const next_constants_1 = require("../packages/next-constants");
/**
 * Frontmatter schema of a Markdown-based blog post.
 */
const frontmatterSchema = {
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        date: { type: "string", format: "date", required: true },
        tags: { type: "array", uniqueItems: true, maxItems: 4 },
        cover: {
            type: "object",
            properties: {
                url: { type: "string", format: "url" },
                icons: { type: "array" },
            },
        },
    },
};
const BLOG_DIR = path_1.default.join(next_constants_1.PAGES_DIR, "blog");
/**
 * Generates `cover` for a blog post based on its metadata.
 * @param metadata The blog post's metadata, should has `title` and (optional) `cover`
 */
const generatePostCover = (metadata) => {
    const { cover, title } = metadata;
    if (cover && cover.url)
        return { url: cover.url };
    const url = new url_1.URL(encodeURIComponent(`${title}.jpg`), "https://img.phuctm97.com/api/v2/");
    const icons = (cover && cover.icons) || [];
    for (let icon of icons) {
        url.searchParams.append("icons", icon);
    }
    return {
        url: url.toString(),
        width: 1200,
        height: 630,
    };
};
exports.generatePostCover = generatePostCover;
/**
 * A unified/remark plugin that parses and extracts a blog post's metadata from its file (if applicable).
 */
const postParser = () => (tree, file) => {
    if (!file.path)
        return file.fail("Unknown file path.");
    if (!is_post_1.default(file.path))
        return file.message("Not a post, skip.");
    const { path: relURL, folder, slug } = get_url_1.default(file.path);
    const data = file.data;
    const { frontmatter } = data;
    if (!frontmatter)
        return file.fail("No frontmatter.");
    // Validate frontmatter.
    const validation = revalidator_1.default.validate(frontmatter, frontmatterSchema);
    if (!validation.valid)
        return file.fail("Invalid frontmatter: " + JSON.stringify(validation.errors, null, 2));
    let title;
    let description;
    // Find title in frontmatter.title -> first h1.
    if (frontmatter.title) {
        title = frontmatter.title;
    }
    else {
        const h1 = unist_util_select_1.select("heading[depth=1]", tree);
        if (!h1)
            return file.fail("Couldn't find title.");
        title = mdast_util_to_string_1.default(h1);
    }
    // Find description in frontmatter.description -> first p.
    if (frontmatter.description) {
        description = frontmatter.description;
    }
    else {
        const p = unist_util_select_1.select("paragraph", tree);
        if (!p)
            return file.fail("Couldn't find description.");
        description = mdast_util_to_string_1.default(p);
    }
    data.post = {
        title,
        description,
        date: frontmatter.date,
        tags: frontmatter.tags || [],
        cover: exports.generatePostCover({ ...frontmatter, title }),
        path: relURL,
        folder,
        slug,
    };
};
exports.postParser = postParser;
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
    const file = mdx_with_frontmatter_1.reader().use(exports.postParser).processSync(to_vfile_1.default.readSync(absPath));
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
