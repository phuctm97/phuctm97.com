"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unist_is_parent_1 = __importDefault(require("../unist-is-parent"));
/**
 * A unified/remark plugin that exports `post` from a _parsed_ MDX blog post for dynamic rendering (if applicable).
 */
const exporter = () => (tree, file) => {
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
exports.default = exporter;
