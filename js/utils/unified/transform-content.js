"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unist_util_select_1 = require("unist-util-select");
const mdast_util_to_string_1 = __importDefault(require("mdast-util-to-string"));
const compose_1 = __importDefault(require("../../utils/content/compose"));
const url_1 = __importDefault(require("../../utils/content/url"));
const frontmatter_1 = __importDefault(require("../../utils/content/frontmatter"));
const is_parent_1 = __importDefault(require("../../utils/unist/is-parent"));
const parseTitle = (tree) => {
    const h1 = unist_util_select_1.select("heading[depth=1]", tree);
    if (!h1)
        throw new Error("No h1.");
    return mdast_util_to_string_1.default(h1);
};
const parseDescription = (tree) => {
    const p = unist_util_select_1.select("paragraph", tree);
    if (!p)
        throw new Error("No p.");
    return mdast_util_to_string_1.default(p);
};
const applyPlugins = compose_1.default([]);
const transformContent = () => (tree, file) => {
    if (!file.path)
        return file.fail("No file.path.");
    const frontmatter = frontmatter_1.default(file.data);
    const content = applyPlugins(frontmatter, {
        metadata: {
            title: frontmatter.title || parseTitle(tree),
            description: frontmatter.description || parseDescription(tree),
            ...url_1.default(file.path),
        },
    });
    if (!is_parent_1.default(tree))
        return file.fail("Tree is empty.");
    tree.children.unshift({
        type: "import",
        value: `import Layout from "../../layouts/${content.metadata.folder}";`,
    });
    tree.children.push({
        type: "export",
        value: `export const metadata = ${JSON.stringify(content.metadata)};`,
    }, {
        type: "export",
        default: true,
        value: `export default Layout;`,
    });
};
exports.default = transformContent;
