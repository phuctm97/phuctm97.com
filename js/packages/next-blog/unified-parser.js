"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unist_util_select_1 = require("unist-util-select");
const mdast_util_to_string_1 = __importDefault(require("mdast-util-to-string"));
const is_post_1 = __importDefault(require("../next-blog/is-post"));
const get_url_1 = __importDefault(require("../next-blog/get-url"));
const validate_frontmatter_1 = __importDefault(require("../next-blog/validate-frontmatter"));
const generate_cover_1 = __importDefault(require("../next-blog/generate-cover"));
/**
 * A unified plugin that parses and extracts a blog post's metadata from its file (if applicable).
 */
const parser = () => (tree, file) => {
    if (!file.path)
        return file.fail("Unknown file path.");
    if (!is_post_1.default(file.path))
        return file.message("Not a post, skip.");
    const { path: relURL, folder, slug } = get_url_1.default(file.path);
    const data = file.data;
    const { frontmatter } = data;
    if (!frontmatter)
        return file.fail("No frontmatter.");
    validate_frontmatter_1.default(frontmatter);
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
        cover: generate_cover_1.default({ ...frontmatter, title }),
        path: relURL,
        folder,
        slug,
    };
};
exports.default = parser;
