"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBlog = exports.postIsntNil = exports.getBlogFiles = exports.readPost = exports.postExporter = exports.postParser = exports.getPostPath = void 0;
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const unist_util_select_1 = require("unist-util-select");
const mdast_util_to_string_1 = __importDefault(require("mdast-util-to-string"));
const dir_1 = __importDefault(require("./dir"));
const remark_1 = require("./remark");
const trimPagesDir = (s) => s.startsWith(dir_1.default.pages) ? s.substr(dir_1.default.pages.length + 1) : s;
const trimMDXExt = (s) => s.endsWith(".mdx") ? s.substring(0, s.length - 4) : s;
const getPostPath = (absPath) => {
    const trimmed = trimPagesDir(trimMDXExt(absPath));
    const folder = path_1.default.dirname(trimmed);
    const slug = path_1.default.basename(trimmed);
    return { path: `/${folder}/${slug}`, folder, slug };
};
exports.getPostPath = getPostPath;
const postParser = () => (tree, file) => {
    if (!file.path)
        return file.fail("Unknown file path.");
    const { path: relURL, folder, slug } = exports.getPostPath(file.path);
    let title = "";
    let description = "";
    let date = "";
    const data = remark_1.getVFileData(file);
    const { frontmatter } = data;
    if (frontmatter) {
        date = frontmatter.date;
    }
    // Find title in frontmatter.title -> first h1.
    if (frontmatter && typeof frontmatter.title === "string") {
        title = frontmatter.title;
    }
    else {
        const h1 = unist_util_select_1.select("heading[depth=1]", tree);
        if (h1)
            title = mdast_util_to_string_1.default(h1);
    }
    // Find description in frontmatter.description -> first p.
    if (frontmatter && typeof frontmatter.description === "string") {
        description = frontmatter.description;
    }
    else {
        const p = unist_util_select_1.select("paragraph", tree);
        if (p)
            description = mdast_util_to_string_1.default(p);
    }
    data.post = {
        title,
        description,
        date,
        path: relURL,
        folder,
        slug,
    };
};
exports.postParser = postParser;
const postExporter = () => (tree, file) => {
    const { post } = remark_1.getVFileData(file);
    if (!post)
        return file.message("Not a post, skip.");
    if (!remark_1.isParent(tree))
        return file.fail("Tree is empty.");
    tree.children.push({
        type: "export",
        value: `export const post = ${JSON.stringify(post)};`,
    });
};
exports.postExporter = postExporter;
const readPost = (absPath) => {
    const file = remark_1.reader().use(exports.postParser).processSync(remark_1.toVFile(absPath));
    const { post } = remark_1.getVFileData(file);
    return post;
};
exports.readPost = readPost;
const getBlogFiles = () => glob_1.default.sync("**/*.mdx", {
    cwd: dir_1.default.blog,
    absolute: true,
});
exports.getBlogFiles = getBlogFiles;
const postIsntNil = (val) => !!val;
exports.postIsntNil = postIsntNil;
const readBlog = () => exports.getBlogFiles()
    .map(exports.readPost)
    .filter(exports.postIsntNil)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
exports.readBlog = readBlog;
